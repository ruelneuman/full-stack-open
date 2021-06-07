import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";

import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatient } from "../state";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const iconNames = {
    [Gender.Male]: "mars" as const,
    [Gender.Female]: "venus" as const,
    [Gender.Other]: "neuter" as const,
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(addPatient(patientFromApi));
      } catch (error) {
        console.error(error);
      }
    };

    if (!patient) {
      void fetchPatient();
    }
  }, [dispatch, id]);

  if (!patient) return null;

  return (
    <div className="patient">
      <Container>
        <h3>{patient.name} <Icon name={iconNames[patient.gender]} /></h3>
        <div><strong>SSN: </strong>{patient.ssn || '-'}</div>
        <div><strong>Date of Birth: </strong>{patient.dateOfBirth || '-'}</div>
        <div><strong>Occupation: </strong>{patient.occupation}</div>
        <h4>Entries</h4>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Container>
    </div>
  );
};

export default PatientPage;
