import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';


export default function AnalyzeData() {
  const { patientId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://trusthealthyapp.us-east-2.elasticbeanstalk.com/trusthealthy/api/patients/analyze/${patientId}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
  }, [patientId]);

  return (
    <Container>
      <h2>Patient Details:</h2>
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
      <p>Age: {data.age}</p>
      <p>Date/Time: {data.measuredDateTime}</p>

      <h2>Clinical Report:</h2>
      {!isLoading &&
        <Table striped bordered hover align="center">
          <thead>
            <tr>
              <th>Clinical Entry Type</th>
              <th>Value</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {data.clinicalData.map((eachEntry, index) => (
              <RowCreator key={index} item={eachEntry} />
            ))}
          </tbody>
        </Table>
      }

      <Link to={'/'}>Go Back</Link>
    </Container>
  )
}

function RowCreator(props) {
  const eachEntry = props.item;
  return (
    <tr>
      <td>{eachEntry.name}</td>
      <td>{eachEntry.value}</td>
      <td>{eachEntry.measuredDateTime}</td>
    </tr>
  );
}




