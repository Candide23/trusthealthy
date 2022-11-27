import React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

    const[patientData, setPatientData] = useState([]);
    const[isLoading, setLoading] = useState(true);

    useEffect(() =>{
        axios.get('http://localhost:8081/trusthealthy/api/patients').then(res=>{
            setPatientData(res.data);
            setLoading(false);
        })





    },[patientData])
      return (<div>
            <h2>Patients:</h2>
            <table align='center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
            {!isLoading?patientData.map((patient, index)=><RowCreator key={index} item={patient}/>):null}

                </tbody>
            </table>
            <br/>
            <Link  to={'/addPatient'}><font size="5">Register Patient</font></Link>
        </div>)
}

function RowCreator(props){
  
        var patient = props.item;
        return <tr>
            <td>{patient.id}</td>
            <td>{patient.firstName}</td>
            <td>{patient.lastName}</td>
            <td>{patient.age}</td>
            <td>{patient.measuredDateTime}</td>
            <td><Link to={'/patientDetails/'+patient.id}>Add Data</Link></td>
            <td><Link to={'/analyze/'+patient.id}>Analyze</Link></td>
        </tr>
    
}


