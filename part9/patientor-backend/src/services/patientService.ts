import patients from '../../data/patients';
import {
  PublicPatient,
  NewPatient,
  Patient,
  NewEntry,
  Entry,
} from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient
  };

  patients.push(patient);

  return patient;
};

const findPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addEntry = (patientId: string, newEntry: NewEntry): Patient | undefined => {
  const entry: Entry = {
    id: uuid(),
    ...newEntry
  };

  const patient = findPatientById(patientId);

  patient?.entries.push(entry);

  return patient;
};

export default {
  getPatients,
  addPatient,
  findPatientById,
  addEntry,
};