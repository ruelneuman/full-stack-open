import {
  NewPatient,
  NewEntry,
  NewBaseEntry,
  EntryType,
  OccupationalHealthcareEntry,
  Gender,
  HealthCheckRating,
  SickLeave,
  Discharge,
  Diagnosis,
} from './types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isArrayOfStrings = (param: unknown): param is string[] => {
  return Array.isArray(param) && param.every((item) => isString(item));
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseToString = (arg: unknown, name: string): string => {
  if (!arg || !isString(arg)) {
    throw new Error(`Incorrect or missing ${name}: ${arg}`);
  }

  return arg;
};

const parseToDate = (date: unknown, name: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${name}: ` + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error('Incorrect or type: ' + entryType);
  }
  return entryType;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error('Missing sick leave');
  }

  return {
    startDate: parseToDate(sickLeave.startDate, 'sick leave start date'),
    endDate: parseToDate(sickLeave.endDate, 'sick leave end date'),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error('Missing discharge');
  }

  return {
    date: parseToDate(discharge.date, 'discharge date'),
    criteria: parseToString(discharge.criteria, 'discharge criteria'),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (!isArrayOfStrings(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes');
  }

  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {

  const newPatient: NewPatient = {
    name: parseToString(object.name, 'name'),
    dateOfBirth: parseToDate(object.dateOfBirth, 'date of birth'),
    ssn: parseToString(object.ssn, 'SSN'),
    gender: parseGender(object.gender),
    occupation: parseToString(object.occupation, 'occupation'),
    entries: [],
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseEntryType(object.type),
    description: parseToString(object.description, "description"),
    date: parseToDate(object.date, "date"),
    specialist: parseToString(object.specialist, "specialist"),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  const newEntry = toNewBaseEntry(object) as NewEntry;

  switch (newEntry.type) {
    case EntryType.Hospital:
      return {
        ...newEntry,
        discharge: parseDischarge(object.discharge),
      };
    case EntryType.OccupationalHealthcare:
      const newOccupationalHealthcareEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
        ...newEntry,
        employerName: parseToString(object.employerName, 'employer name'),
      };

      if (object.sickLeave) {
        newOccupationalHealthcareEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return newOccupationalHealthcareEntry;
    case EntryType.HealthCheck:
      return {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    default:
      return assertNever(newEntry);
  }
};