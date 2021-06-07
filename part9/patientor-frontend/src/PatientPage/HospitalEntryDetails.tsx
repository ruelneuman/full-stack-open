import React from "react";
import { HospitalEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

interface HospitalEntryDetailsProps {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: HospitalEntryDetailsProps) => {
  return (
    <div>
      <div>{entry.date} <em>{entry.description}</em></div>
      <div>Specialist: {entry.specialist}</div>
      <div>Discharge Date: {entry.discharge.date}</div>
      <div>Discharge Criteria: {entry.discharge.criteria}</div>
      {entry.diagnosisCodes && <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />}
    </div>
  );
};

export default HospitalEntryDetails;