import React from 'react'

import { Outlet } from 'react-router-dom'

import { Link} from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* <nav className="navbar">
      

      <ul style={{display:'flex',listStyle:"none", gap:"10px"}}>

        <li><Link to="/home">login</Link></li> |
        <li><Link to="/admindashboard">dashboard</Link></li> |
    
      </ul>

    
    </nav> */}

      <main>
        <Outlet/>
      </main>

      
    </>
  )
}

export default Layout
