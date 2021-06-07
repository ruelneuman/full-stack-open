import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import DiagnosisList from "./DiagnosisList";

interface OccupationalHealthcareEntryDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetails = ({ entry }: OccupationalHealthcareEntryDetailsProps) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name="briefcase"></Icon>
        </Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>
          <p>{entry.description}</p>
          <p><strong>Employer: </strong>{entry.employerName}</p>
          {entry.sickLeave &&
            <p><strong>Sick Leave: </strong>{entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {entry.diagnosisCodes
          ? <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
          : <p>No diagnosis codes</p>}
      </Card.Content>
    </Card>

  );
};

export default OccupationalHealthcareEntryDetails;