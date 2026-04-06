import React, { useState } from 'react'
import "../css/createuser.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = import.meta.env.VITE_API_URL;

const CreateUser = () => {
    const [input,setInput] = useState({})

    // const navigate = useNavigate()

    const handleInput = async (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(values=>({...values,[name]:value}))
        console.log(input)
    }

    const handleSubmit =async(e)=>{
        e.preventDefault()

            let api = `${API}/admin/createuser`;
            const response = await axios.post(api,input)
             toast.success(response.data.msg) 
            // navigate("/admindashboard")
            console.log(response)

    }
    return (
        <>
            <div className="user-container"> 
  <form className="user-form-box">
    <h1>USER CREATE FORM</h1>

    <div className="user-input-group">
      <label>name</label>
      <input type="text" name="name" placeholder="Enter name" onChange={handleInput}/>
    </div>

    <div className="user-input-group">
      <label>Email</label>
      <input type="text" name="email" placeholder="Enter email" onChange={handleInput} />
    </div>

    <div className="user-input-group">
      <label>User Admit</label>
      <select name="post" onChange={handleInput}>
        <option>Select User Type</option>
        <option value="Programmer">Programmer</option>
        <option value="Designer">Designer</option>
        <option value="Analyst">Analyst</option>
        <option value="Team Leader">Team Leader</option>
        <option value="Project Manager">Project Manager</option>
        <option value="Database Designer">Database Designer</option>
      </select>
    </div>

    <button className="user-btn" onClick={handleSubmit}>Submit</button>
  </form>
</div>

<ToastContainer  theme="dark"/>

        </>
    )
}

export default CreateUser;