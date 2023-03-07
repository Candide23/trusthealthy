import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function CollectClinicals() {
  const [patientData, setPatientData] = useState({});
  const { patientId } = useParams();

  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const[measuredDateTime,setMeasuredDateTime] = useState('')

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://trusthealthyapp.us-east-2.elasticbeanstalk.com/trusthealthy/api/patients/${patientId}`)
      .then((res) => {
        setPatientData(res.data);
        setLoading(false);
      });
  }, [patientId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      patientId,
      name,
      value,
    };

    axios.post('http://trusthealthy.us-east-1.elasticbeanstalk.com/trusthealthy/api/clinicals/', data).then(() => {
      toast('Patient data added successfully');
    });
  };

  return (
    <Container  >
      <Row >
        <Col>
          <h2>Patient Details:</h2>
          <p>
            First Name: {!isLoading ? patientData.firstName : ''}
            <br />
            Last Name: {!isLoading ? patientData.lastName : ''}
            <br />
            Age: {!isLoading ? patientData.age : ''}
          </p>
        </Col>
        <Col>
          <h2>Patient Clinical Data:</h2>
          <Form onSubmit={handleSubmit} >
            <Form.Group controlId="clinical-entry-type">
              <Form.Label>Clinical Entry Type:</Form.Label>
              <Form.Control as="select"  onChange={(e) => setName(e.target.value)}>
                <option>Select One</option>
                <option value="bp">Blood Pressure(Sys/Dys)</option>
                <option value="hw">Height/Weight</option>
                <option value="heartrate">Heart Rate</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="value">
              <Form.Label>Value:</Form.Label>
              <Form.Control type="text" name="value" onChange={(e) => setValue(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </Form>
        </Col>
      </Row>

      <Link to="/">Go Back</Link>
    </Container>
  );
}


