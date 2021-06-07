import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

interface OccupationalHealthcareEntryDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetails = ({ entry }: OccupationalHealthcareEntryDetailsProps) => {
  return (
    <div>
      <div>{entry.date} <em>{entry.description}</em></div>
      <div>Specialist: {entry.specialist}</div>
      <div>Employer: {entry.employerName}</div>
      {entry.sickLeave && <div>Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</div>}
      {entry.diagnosisCodes && <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />}
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;