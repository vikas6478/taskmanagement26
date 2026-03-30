import React from "react";
import "../css/dashboard.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.clear();
    navigate("/home")
  }
  return (
    <>
    <div className="dashboard">
      
      
      <div className="sidebar">
        <h2 className="logo">MyApp</h2>
        <ul className="menu">
          <li className="menu-item active">Dashboard</li>
        <li className="menu-item"><Link to="createuser" >Create User</Link></li> 
          <li className="menu-item">Reports</li>
          <li className="menu-item">Settings</li>
        </ul>
      </div>

      
     <div className="main">

  <div className="header">
    <h1>Dashboard</h1>
    <div className="profile"><button onClick={logout}>Logout</button></div>
  </div>

    <Outlet />

  {/* <div className="main">

    <div className="welcome-box">
      <h2>Welcome to Dashboard 👋</h2>
      <p>Manage everything from here easily.</p>
    </div>

  </div> */}

</div>

    </div>
    </>
  );
};

export default Dashboard;