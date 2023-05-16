import { Component } from "react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import profiler from './profiler.png';
import student from './student.png';
import dashboard from './dashboard.png'
import { Link } from "react-router-dom";
import axios from "axios";

import WebFont from 'webfontloader';

const TeacherStudent = () =>
{

    const [userdetails, userdetailsupdate] = useState("");
    const [teachers, teachersupdate] = useState([]);
    const [classes, classesupdate] = useState([]);
    const [students, studentsupdate] = useState([]);
    const [classStudents, classstudentsUpdate] = useState([]);

    useEffect(() =>
    {

        let jwttoken = sessionStorage.getItem('jwttoken');
        let classId = sessionStorage.getItem('classId');

        fetch(`https://localhost:7181/api/User/Get-StudentsByClassId?id=${classId}`, {
            headers: {
                'Authorization': 'Bearer ' + jwttoken
            }
        }).then((res) =>
        {
            return res.json();
        }).then((resp) =>
        {
            classstudentsUpdate(resp.data);
        }).catch((res) =>
        {
            toast.error('Registration Failed: ' + res.message);
        });
    }, [])

    useEffect(() =>
    {

        let jwttoken = sessionStorage.getItem('jwttoken');

        fetch("https://localhost:7181/api/User/Get-Teachers", {
            headers: {
                'Authorization': 'Bearer ' + jwttoken
            }
        }).then((res) =>
        {
            return res.json();
        }).then((resp) =>
        {
            teachersupdate(resp.data);
        }).catch((res) =>
        {
            toast.error('Registration Failed: ' + res.message);
        });
    }, [])

    useEffect(() =>
    {

        let jwttoken = sessionStorage.getItem('jwttoken');

        fetch("https://localhost:7181/api/User/Get-Students", {
            headers: {
                'Authorization': 'Bearer ' + jwttoken
            }
        }).then((res) =>
        {
            return res.json();
        }).then((resp) =>
        {
            studentsupdate(resp.data);
        }).catch((res) =>
        {
            toast.error('Registration Failed: ' + res.message);
        });
    }, [])

    useEffect(() =>
    {

        let jwttoken = sessionStorage.getItem('jwttoken');

        fetch("https://localhost:7181/api/Class/GetAllClass", {
            headers: {
                'Authorization': 'Bearer ' + jwttoken
            }
        }).then((res) =>
        {
            return res.json();
        }).then((resp) =>
        {
            classesupdate(resp.data);
        }).catch((res) =>
        {
            toast.error('Registration Failed: ' + res.message);
        });
    }, [])


    useEffect(() =>
    {
        WebFont.load({
            google: {
                families: ['Karla', 'Poppins']
            }
        });
    }, []);

    useEffect(() =>
    {

        let id = sessionStorage.getItem('id')

        console.log(id);

        let jwttoken = sessionStorage.getItem('jwttoken');

        fetch(`https://localhost:7181/api/User/Get-UserById?id=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + jwttoken
            }
        }).then((res) =>
        {
            return res.json();
        }).then((resp) =>
        {
            console.log(resp);
            userdetailsupdate(resp)
        })
            .catch((res) =>
            {
                toast.error('Registration Failed: ' + res.error);
            });
    }, []);

    const handleStudentDelete = (id) =>
    {
        let jwttoken = sessionStorage.getItem('jwttoken');
        axios.delete(`https://localhost:7181/api/User/Delete-User?id=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + jwttoken
            }
        })
            .then(() =>
            {
                // Remove the deleted item from the list
                studentsupdate(students.filter((item) => item.id !== id));
                toast.success('Student Deleted')
            })
            .catch((error) =>
            {
                toast.error('Student not deleted')
            });
    }

    const handleStudentEdit = () =>
    {
        toast.success('Student Updated')
    }


    return (

        <div className="div-container">
            <input className="input" type="checkbox" id="inpute" />
            <label for="inpute">
                <div className="toggle">
                    <span className="top-line common"></span>
                    <span className="middle-line common"></span>
                    <span className="bottom-line common"></span>
                </div>
            </label>
            <div className="module-sidebar">
                <div className="sidebar-header">
                    <img className="header-icon"></img>
                    <h2 className="header-label">MENU</h2>
                </div>
                <div className="sidebar-menu-container">
                    <div className="sidebar-menu">
                        <img className="menu-icon" src={dashboard} alt="dashboard"></img>
                        <button className="menu-button"><Link to={'/teacher'} style={{ textDecoration: 'none' }}><h4 className="menu-label">Dashboard</h4></Link></button>
                    </div>
                    <div className="sidebar-menu">
                        <img className="menu-icon" src={student} alt="student"></img>
                        <button className="menu-button"><Link to={'/teacher-student'} style={{ textDecoration: 'none' }}><h4 className="menu-label">Students</h4></Link></button>
                    </div>
                    <div className="sidebar-menu">
                        <img className="menu-icon" src={profiler} alt="profile"></img>
                        <button className="menu-button"><h4 className="menu-label">Profile</h4></button>
                    </div>
                    <div className="sidebar-menu">
                        <button className="logout-button"><Link to={'/login'} style={{ textDecoration: 'none' }}><h4 className="logout-label">Logout</h4></Link></button>
                    </div>
                </div>
            </div>

            <div className="information-bar">
                <h1 className="information-bar-header">Welcome Admin </h1>
                <div className="admin-details">
                    <div className="name-and-email">
                        {/* <h3 className="detail">{admin.data.firstName} {admin.data.lastName}</h3>
                        <h3 className="detail">{admin.data.email}</h3>
                        <h3 className="detail">{admin.data.phoneNumber}</h3> */}
                    </div>
                </div>
                <div className="details-container">
                    <div className="number-container">
                        <h1 className="number-container-header">Students</h1>
                        <h1 className="number-container-number">{students.length}</h1>
                    </div>
                    <div className="number-container">
                        <h1 className="number-container-header">Teachers</h1>
                        <h1 className="number-container-number">{teachers.length}</h1>
                    </div>
                    <div className="number-container">
                        <h1 className="number-container-header">Classes</h1>
                        <h1 className="number-container-number">{classes.length}</h1>
                    </div>
                </div>

                <div className="table-container">
                    <h1 className="information-bar-header">Students</h1>
                    <button className="table-add-button"><Link to={'/teacher-register-student'} style={{ textDecoration: 'none' }}><p className="add-button-label">Add Student</p></Link></button>
                    <table className="table">
                        <thead className="table-head">
                            <tr className="table-head-row">
                                <td className="table-head-detail">First Name         </td>
                                <td className="table-head-detail">Last Name  </td>
                                <td className="table-head-detail">Email  </td>
                                <td className="table-head-detail">Class  </td>
                                <td className="table-head-detail">Action </td>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {classStudents.map(item =>
                            {
                                { console.log(classStudents) }
                                return <tr key={item.id}>
                                    <td className="table-body-detail">{item.firstName}</td>
                                    <td className="table-body-detail">{item.lastName}</td>
                                    <td className="table-body-detail">{item.email}</td>
                                    <td className="table-body-detail">{item.class}</td>
                                    <td ><Link to={`/teacher-student/${item.id}`} style={{ textDecoration: 'none' }}><button className="table-edit-button">Edit</button></Link></td>
                                    <td><button className="table-delete-button" onClick={() => handleStudentDelete(item.id)}>Delete</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}

export default TeacherStudent