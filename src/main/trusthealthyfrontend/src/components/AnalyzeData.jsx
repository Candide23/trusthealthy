import React from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';



export default function AnalyzeData(){
    const [data,setData] = useState([])
    const {patientId} = useParams()
    const [isLoading,setLoading]=useState(true)


   
    useEffect(()=>{
        axios.get('http://localhost:8081/trusthealthy/api/patients/analyze/'+ patientId).then(res=>{
            setData(res.data);
            setLoading(false)
        })
        
    },[patientId]);

  
        return (<div>
              <h2>Patient Details:</h2>
                First Name: {data.firstName}<br/>
                Last Name: {data.lastName}<br/>
                Age: {data.age}<br/>
                Date/Time: {data.measuredDateTime}
              
            <h2>Clinical Report:</h2>
                    {!isLoading?data.clinicalData.map((eachEntry, index)=><RowCreator key={index} item={eachEntry} 
                    />):null}
            
            <Link to={'/'}>Go Back</Link>

        </div>)
    
}

function RowCreator(props){
        var eachEntry = props.item;
       
        return<div>
            <table align="center">
            <tr>
                <td><b>{eachEntry.name}</b></td>
            </tr>
            <tr>
            <td>{eachEntry.name}</td>
            <td>{eachEntry.value}</td>
            <td>{eachEntry.measuredDateTime}</td>

        </tr>
        </table>
        </div>
    }


