import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Assigntask = () => {
    const [mydata, setMyData]= useState([])
     const [show, setShow] = useState(false);
    const [userid, setUserID] =useState("");
     const [usertask, setUserTask] = useState("");
     const [days, setDays] = useState("");
     
  const handleClose = () => setShow(false);
  const handleShow = (uid) =>{
     setUserID(uid)
     setShow(true);
  } 

    const loadData = async()=>{
        let api = "http://localhost:8000/admin/getuserdata";
        const response = await axios.get(api)
        setMyData(response.data)
        console.log(response.data)
        console.log(mydata) 
    }

    useEffect(()=>{
        loadData();
    },[])

    const handleSubmitTask=async(e)=>{
    e.preventDefault();
  let api = "http://localhost:8000/admin/assigntask";
  const response = await axios.post(api, {userid, usertask, days});
  console.log(response.data);
  // console.log(response.data.msg)
}

    let sno=0;
    const ans = mydata.map((key)=>{
        sno++;
        return(
            <>
             <tr>
                <td>{sno}</td>
            <td>{key.name}</td>
            <td>{key.email}</td>
            <td>{key.post}</td>
            <td><Button variant="info" onClick={()=>{handleShow(key._id)}}>AssignTask</Button></td>
            
        </tr>
            </>
        )
       
    })
  return (
   <>
  <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Sno</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>USERNAME</th>
          <th>ASSIGN TASK</th>
        </tr>
      </thead>
      <tbody>
    {ans}
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Task</Form.Label>
        <Form.Control type="text" value={usertask} onChange={(e)=>{setUserTask(e.target.value)}}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Days</Form.Label>
        <Form.Control type="text" value={days} onChange={(e)=>{setDays(e.target.value)}} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmitTask}> 
        Submit
      </Button>
    </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
   </>
  )
}

export default Assigntask
