import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v1 as uuidv1 } from 'uuid';
import { Container, Icon, List } from "semantic-ui-react";

import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatient } from "../state";

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  dispatch;

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
        {patient.entries.map((entry) => {
          return (
            <div key={entry.id}>
              <div>{entry.date} <em>{entry.description}</em></div>
              <List bulleted>
                {entry.diagnosisCodes?.map((code) => {
                  return (
                    <List.Item key={uuidv1()}>
                      {code} {diagnoses[code]?.name}
                    </List.Item>
                  );
                })}
              </List>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default PatientPage;
