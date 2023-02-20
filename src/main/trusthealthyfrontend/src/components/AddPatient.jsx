import {React,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button } from 'react-bootstrap';

toast.configure();

function AddPatient() {
 const[firstName,setFirstName] = useState('')
const[lastName,setLastName] = useState('')
const[age,setAge] = useState('')
const[measuredDateTime,setMeasuredDateTime] = useState('')
const [isLoading,setLoading]=useState(true)

const handleSubmit=(event)=>{

event.preventDefault();
    const data = {
        firstName :firstName,
        lastName :lastName,
        age :age,
        measuredDateTime:measuredDateTime
    }

      axios.post('http://localhost:8081/trusthealthy/api/patients/',data).then(res=>{
        toast("Patient added successfully");
        setLoading(false);
    })

}


    return (<div className="container">
            <h2>Create Patient:</h2>
            <Form onSubmit={e => { e.preventDefault(); }}>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" onChange={e=>setFirstName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" onChange={e=>setLastName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicAge">
                <Form.Label>Age</Form.Label>
                <Form.Control type="text" placeholder="Enter Age" onChange={e=>setAge(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit.bind(this)}>Confirm</Button>
            </Form>
            <Link  to={'/'}>Go Back</Link>
    </div>
  );
}

export default AddPatient;