import React, { useState } from 'react'
import "../css/home.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [usertype,setUserType] = useState("")
    const navigate = useNavigate()

    const handleSubmit =async(e)=>{
        e.preventDefault()

        if(usertype=="admin"){

            let api = "http://localhost:8000/admin/userlogin"
            const response = await axios.post(api,{email,password})
            localStorage.setItem("admin",response.data.admin.email)
            localStorage.setItem("adminname",response.data.admin.name)
            alert(response.data.msg)
            navigate("/admindashboard")
            console.log(response)

        }else{
             
            let api = "http://localhost:8000/user/userlogin" 
            const response = await axios.post(api,{email,password})
            localStorage.setItem("username", response.data.user.name);
            localStorage.setItem("useremail", response.data.user.email);
            localStorage.setItem("userid", response.data.user._id);
            console.log(response)
            alert(response.data.msg)
        navigate("/userdashboard");

        }
    }
    return (
        <>
            <div className="container">
                <form className="form-box">
                    <h1>LOGIN FORM</h1>

                    <div className="input-group">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>

                    <div className="input-group">
                        <label>User Admit</label>
                        <select name="admit" onChange={(e)=>{setUserType(e.target.value)}}>
                            <option >Select User Type</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <button className="login-btn" onClick={handleSubmit}>Submit</button>
                </form>
            </div>

        </>
    )
}

export default Home;