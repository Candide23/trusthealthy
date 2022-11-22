import React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

    const[patientData, setPatientData] = useState([]);
    const[isLoading, setLoading] = useState(true);

    useEffect(() =>{
        axios.get('http://localhost:8081/')

    },[])

    return(<div>

    </div>)


}