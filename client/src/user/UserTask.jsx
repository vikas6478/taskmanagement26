import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../css/assigntask.css"
const UserTask = () => {
    const [mydata, setMydata] = useState([]);
    const [show, setShow] = useState(false);
    const [taskStatus, setTaskStatus]= useState("");
    const [compDay, setCompDay] = useState("");
    const [taskID, setTaskID] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (id) =>{
         setTaskID(id)
          setShow(true);
    } 
    const loadData = async () => {
        let api = `http://localhost:8000/user/getusertask/?id=${localStorage.getItem("userid")}`;
        const response = await axios.get(api);
        console.log(response.data);
        setMydata(response.data);
    }
    useEffect(() => {
        loadData();
    }, [])


  const handleSubmitTask=async(e)=>{
       e.preventDefault();
          let api = "http://localhost:8000/user/settaskstatus";
          const response = await axios.post(api, {taskID, taskStatus, compDay})
         console.log(response.data);    
         if(response){
            alert("Ok")
         }
         
  }



    let sno = 0;
    const ans = mydata.map((key) => {
        sno++;
        return (
            <>
                <tr>
                    <td>{sno}</td>
                    <td> {key.usertask} </td>
                    <td> {key.days} </td>
                    <td>
                 <Button variant="primary" onClick={()=>{handleShow(key._id)}}>Send Report</Button>
                    </td>
                </tr>
            </>
        )
    })
    return (
        <>
            <h2> Your Assign Task</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th>Completion Days</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="dark-modal">
                    <Modal.Title>Send Report</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                           <Form.Label>Select Task Status</Form.Label>
                           <Form.Select aria-label="Default select example" onChange={(e)=>{setTaskStatus(e.target.value)}} className="bg-dark text-white">
                         <option>Open this select menu</option>
                         <option value="Fully Completed">Fully Completed</option>
                         <option value="Partial Completed">Partial Completed</option>
                         <option value="No Complete">No Complete</option>
                           </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Enter Completion days</Form.Label>
                            <Form.Control type="text" onChange={(e)=>{setCompDay(e.target.value)}} className="bg-dark text-white"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmitTask}>
                            Submit
                        </Button>
                    </Form>


                </Modal.Body>
                <Modal.Footer className="bg-dark text-white">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default UserTask;