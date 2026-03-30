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
            alert(response.data.msg)
            navigate("/admindashboard")
            console.log(response)

        }else{
             
            let api = "http://localhost:8000/user/userlogin" 
            const response = await axios.post(api,{email,password})
            alert(response.data.msg)
            console.log(response)
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

                    <button className="btn" onClick={handleSubmit}>Submit</button>
                </form>
            </div>

        </>
    )
}

export default Home;