import patients from '../../data/patients';
import { PublicPatient, NewPatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    };
  });
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const findPatientById = (id: string): PublicPatient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getPatients,
  addPatient,
  findPatientById,
};