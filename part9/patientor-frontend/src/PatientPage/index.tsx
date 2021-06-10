import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Icon,
  Card,
  Divider,
  Button,
} from "semantic-ui-react";

import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Patient, Gender, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatient, updatePatient } from "../state";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

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

    if (!patient || !patient.ssn || !patient.entries) {
      void fetchPatient();
    }
  }, [dispatch, id]);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  if (!patient) return null;

  return (
    <div className="patient">
      <Container>
        <h2>Patient Information</h2>
        <h3>{patient.name} <Icon name={iconNames[patient.gender]} /></h3>
        <div><strong>SSN: </strong>{patient.ssn || '-'}</div>
        <div><strong>Date of Birth: </strong>{patient.dateOfBirth || '-'}</div>
        <div><strong>Occupation: </strong>{patient.occupation}</div>
      </Container>

      <h2>Entries</h2>
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <Divider hidden />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Card.Group>
        {patient.entries?.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Card.Group>
    </div>
  );
};

export default PatientPage;
