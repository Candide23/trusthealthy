import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

export default function Home() {
  const [patientData, setPatientData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://trusthealthy.us-east-1.elasticbeanstalk.com/trusthealthy/api/patients").then((res) => {
      setPatientData(res.data);
      setLoading(false);
    });
  }, [patientData]);

  return (
    <div className="container mt-5">
      <h2>Patients:</h2>
      <Table bordered hover className="mt-3" align='center'>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Measured Date/Time</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading ? (
            patientData.map((patient, index) => (
              <RowCreator key={index} item={patient} />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="text-center">
        <Link to={"/addPatient"}>
          <Button variant="primary" size="lg">
            Register Patient
          </Button>
        </Link>
      </div>
    </div>
  );
}

function RowCreator(props) {
  var patient = props.item;
  return (
    <tr>
      <td>{patient.id}</td>
      <td>{patient.firstName}</td>
      <td>{patient.lastName}</td>
      <td>{patient.age}</td>
      <td>{patient.measuredDateTime}</td>
      <td>
        <Link to={"/patientDetails/" + patient.id}>
          <Button variant="success">Add Data</Button>
        </Link>
      </td>
      <td>
        <Link to={"/analyze/" + patient.id}>
          <Button variant="info">Analyze</Button>
        </Link>
      </td>
    </tr>
  );
}



