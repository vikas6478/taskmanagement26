import React from "react";
import "../css/dashboard.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.clear();
    toast.success("you are succesfully logout!") 
    setTimeout(()=>{ 
    navigate("/home")
    },1000)
  }
  return (
    <>
    <div className="dashboard">
      
      
      <div className="sidebar">
         <h2 className="logo"><img src="tasklogoimg.png" alt="Taskmanagement" /></h2>
        <ul className="menu">
          <li className="menu-item active">Admin-Dashboard</li>
        <li className="menu-item"><Link to="createuser" >Create User</Link></li> 
        <li className="menu-item"><Link to="assigntask" >Assign Task</Link></li> 
        <li className="menu-item"><Link to="showreport" >Show Report</Link></li> 
          <li className="menu-item">Reports</li>
          <li className="menu-item">Settings</li>
        </ul>
      </div>

      
     <div className="main">

  <div className="header">
    <h1>ADMIN DASHBOARD</h1>
    <div className="profile">{localStorage.getItem("adminname")} | <button onClick={logout}>Logout</button></div>
  </div>
  <hr />

    <Outlet />

  {/* <div className="main">

    <div className="welcome-box">
      <h2>Welcome to Dashboard 👋</h2>
      <p>Manage everything from here easily.</p>
    </div>

  </div> */}

</div>

    </div>
    <ToastContainer theme="dark" />
    </>
  );
};

export default Dashboard;