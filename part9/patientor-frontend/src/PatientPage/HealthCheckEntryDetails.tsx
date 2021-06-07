import React from "react";
import { HealthCheckEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

interface HealthCheckEntryDetailsProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetails = ({ entry }: HealthCheckEntryDetailsProps) => {
  return (
    <div>
      <div>{entry.date} <em>{entry.description}</em></div>
      <div>Specialist: {entry.specialist}</div>
      <div>Health Check Rating: {entry.healthCheckRating}</div>
      {entry.diagnosisCodes && <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />}
    </div>
  );
};

export default HealthCheckEntryDetails;