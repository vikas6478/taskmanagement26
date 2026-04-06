import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "../css/dashboard.css"
const API = import.meta.env.VITE_API_URL;

const ShowReport = () => {
    const [mydata, setMydata] = useState([]);


    const loadData = async () => {
        let api = `${API}/admin/gettaskreport`;
        const response = await axios.get(api);
        console.log(response.data);
        setMydata(response.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    let sno = 0;
    const ans = mydata.map((key) => {
        sno++;
        return (
            <>
                <tr>
                    <td>{sno}</td>
                    
                    <td>{key.userid?.name || "Deleted User"}</td>
                    <td>{key.userid?.email || "N/A"}</td>
                    <td>{key.usertask}</td>
                    <td>{key.days}</td>
                    <td>{key.taskstatus}</td>
                    <td>{key.compday}</td>
                </tr>
            </>
        )
    })

    return (
        <>
            <h1 className="header">
                 User Task Status Report
            </h1>
            <hr />
             <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Given Task</th>
          <th>Given Days</th>
          <th>Task Status</th>
          <th>Completion Day</th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
</Table>


        </>
    )
}

export default ShowReport;