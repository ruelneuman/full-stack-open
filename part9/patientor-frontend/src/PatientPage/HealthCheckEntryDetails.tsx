import React from "react";
import { HealthCheckEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import DiagnosisList from "./DiagnosisList";
import HealthRatingBar from "../components/HealthRatingBar";

interface HealthCheckEntryDetailsProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetails = ({ entry }: HealthCheckEntryDetailsProps) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name="doctor"></Icon>
        </Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      </Card.Content>
      <Card.Content extra>
        {entry.diagnosisCodes
          ? <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
          : <p>No diagnosis codes</p>}
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntryDetails;