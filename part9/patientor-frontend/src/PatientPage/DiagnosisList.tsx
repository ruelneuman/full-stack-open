import React from "react";
import { v1 as uuidv1 } from 'uuid';
import { List, Label } from "semantic-ui-react";

import { Diagnosis } from "../types";
import { useStateValue } from "../state";

interface DiagnosisListProps {
  diagnosisCodes: Array<Diagnosis["code"]>;
}

const DiagnosisList = ({ diagnosisCodes }: DiagnosisListProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <List>
      {diagnosisCodes.map((code) => {
        return (
          <List.Item key={uuidv1()}>
            <Label horizontal>{code}</Label>
            {diagnoses[code]?.name}
          </List.Item>
        );
      })}
    </List>
  );
};

export default DiagnosisList;
