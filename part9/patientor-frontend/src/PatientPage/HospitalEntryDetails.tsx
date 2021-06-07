import React from "react";
import { HospitalEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import DiagnosisList from "./DiagnosisList";

interface HospitalEntryDetailsProps {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: HospitalEntryDetailsProps) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name="hospital"></Icon>
        </Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>
          <p>{entry.description}</p>
          <p><strong>Discharge Date: </strong>{entry.discharge.date}</p>
          <p><strong>Discharge Criteria: </strong>{entry.discharge.criteria}</p>
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

export default HospitalEntryDetails;