import React, { useState } from 'react'
import "../css/home.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = import.meta.env.VITE_API_URL;

const Home = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [usertype,setUserType] = useState("")
    const navigate = useNavigate()

    const handleSubmit =async(e)=>{
        e.preventDefault()

        if(usertype=="admin"){

            let api = `${API}/admin/userlogin`
            const response = await axios.post(api,{email,password})
            localStorage.setItem("admin",response.data.admin.email)
            localStorage.setItem("adminname",response.data.admin.name)
            toast.success(response.data.msg)
            setTimeout(()=>{
            navigate("/admindashboard")
            },1000)
            console.log(response)

        }else{
             
            let api = `${API}/user/userlogin`
            const response = await axios.post(api,{email,password})
            localStorage.setItem("username", response.data.user.name);
            localStorage.setItem("useremail", response.data.user.email);
            localStorage.setItem("userid", response.data.user._id);
            console.log(response)
            toast.success(response.data.msg)
            setTimeout(() => {
        navigate("/userdashboard");
                
            }, 1000);

        }
    }
    return (
        <>
            <div className="container1">
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
            <ToastContainer theme="dark" />
        </>
    )
}

export default Home;