import React from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom'


export default function CollectClinicals(){
    const [patientData,setPatientData] = useState()
    const {patientId} = useParams()

    const[name,setName] = useState('')
    const[value,setValue] = useState('')
    //const[measuredDateTime,setMeasuredDateTime] = useState('')


    const [isLoading,setLoading]=useState(true)



    useEffect(()=>{

        axios.get('http://localhost:8081/trusthealthy/api/patients/'+patientId).then(res=>{
        
            setPatientData(res.data);
            setLoading(false);

        })
    
    });
 
    const handleSubmit=(event)=>{
        event.preventDefault();
        const data = {
            patientId:patientId,
            name:name,
            value:value
        }

        axios.post('http://localhost:8081/trusthealthy/api/clinicals/',data).then(res=>{
        //console.log(res);
            toast("Patient data added succefully")
        })
     

    }

  
        return (<div>
                <h2>Patient Details:</h2>
                First Name: {!isLoading?patientData.firstName:""}<br/>
                Last Name: {!isLoading?patientData.lastName:""}<br/>
                Age: {!isLoading?patientData.age:""}
                <h2>Patient Clinical Data:</h2>
                <form>
                    Clinical Entry Type:<select onChange={e=>setName(e.target.value)}>
                        <option>Select One</option>
                        <option value="bp">Blood Pressure(Sys/Dys)</option>
                        <option value="hw">Height/Weight</option>
                        <option value="heartrate">Heart Rate</option>
                        </select><br/>
                    Value:<input type="text" name="value" onChange={e=>setValue(e.target.value)}/><br/>

                    <button onClick={handleSubmit.bind(this)}>Confirm</button>
                </form>
                                                    <Link  to={'/'}>Go Back</Link>

        </div>)
    }
