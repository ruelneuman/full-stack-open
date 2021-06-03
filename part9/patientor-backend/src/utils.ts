import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseToString = (arg: unknown, name: string): string => {
  if (!arg || !isString(arg)) {
    throw new Error(`Incorrect or missing ${name}: ${arg}`);
  }

  return arg;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {

  const newPatient: NewPatient = {
    name: parseToString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseToString(ssn, 'SSN'),
    gender: parseGender(gender),
    occupation: parseToString(occupation, 'occupation'),
    entries: [], 
  };

  return newPatient;
};

export default toNewPatient;