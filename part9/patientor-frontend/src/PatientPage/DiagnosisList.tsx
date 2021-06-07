import React from "react";
import { v1 as uuidv1 } from 'uuid';
import { List } from "semantic-ui-react";

import { Diagnosis } from "../types";
import { useStateValue } from "../state";

interface DiagnosisListProps {
  diagnosisCodes: Array<Diagnosis["code"]>;
}

const DiagnosisList = ({ diagnosisCodes }: DiagnosisListProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <List bulleted>
      {diagnosisCodes.map((code) => {
        return (
          <List.Item key={uuidv1()}>
            {code} {diagnoses[code]?.name}
          </List.Item>
        );
      })}
    </List>
  );
};

export default DiagnosisList;
