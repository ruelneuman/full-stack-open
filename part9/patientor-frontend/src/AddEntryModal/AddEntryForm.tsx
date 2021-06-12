import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import * as Yup from 'yup';

import { TextField, SelectField, NumberField, DiagnosisSelection } from "../components/FormField";
import { EntryType, HealthCheckRating, EntryFormValues } from "../types";
import { useStateValue } from "../state";
import { assertNever } from "../utils";

export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: EntryType.HealthCheck, label: "Health Check" }
];

const baseValidationSchema = Yup
  .object()
  .shape({
    type: Yup.string(),
    description: Yup
      .string()
      .min(8)
      .max(1000)
      .required(),
    date: Yup
      .string()
      .matches(/\d{4}-\d{2}-\d{2}/, "date must be formatted YYYY-MM-DD")
      .required(),
    specialist: Yup
      .string()
      .min(2)
      .max(100),
  });

const hospitalValidationSchema = baseValidationSchema.concat(
  Yup.object()
    .shape({
      discharge: Yup
        .object()
        .shape({
          date: Yup
            .string()
            .matches(/\d{4}-\d{2}-\d{2}/, "startDate must be formatted YYYY-MM-DD"),
          criteria: Yup
            .string()
            .min(2)
            .max(1000)
            .required(),
        }),
    })
);

const OccupationalHealthcareValidationSchema = baseValidationSchema.concat(
  Yup.object()
    .shape({
      employerName: Yup
        .string()
        .min(2)
        .max(100)
        .required(),
      sickLeave: Yup
        .object()
        .shape({
          startDate: Yup
            .string()
            .matches(/\d{4}-\d{2}-\d{2}/, "startDate must be formatted YYYY-MM-DD"),
          endDate: Yup
            .string()
            .matches(/\d{4}-\d{2}-\d{2}/, "startDate must be formatted YYYY-MM-DD"),
        }),
    })
);

const healthCheckValidationSchema = baseValidationSchema.concat(
  Yup.object()
    .shape({
      healthCheckRating: Yup
        .number()
        .typeError("healthCheckRating must be a number")
        .min(0)
        .max(3)
        .required(),
    })
);

type ValidationSchema =
| typeof healthCheckValidationSchema
| typeof hospitalValidationSchema
| typeof OccupationalHealthcareValidationSchema;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const [validationSchema, setValidationSchema] = React.useState<ValidationSchema>(healthCheckValidationSchema);

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        discharge: {
          date: "",
          criteria: "",
        }
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values, handleChange }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
              onChange={(event) => {
                const value = (event.currentTarget as HTMLSelectElement).value as EntryType;
                handleChange(event);
                switch (value) {
                  case EntryType.Hospital:
                    setValidationSchema(hospitalValidationSchema);
                    break;
                  case EntryType.OccupationalHealthcare:
                    setValidationSchema(OccupationalHealthcareValidationSchema);
                    break;
                  case EntryType.HealthCheck:
                    setValidationSchema(healthCheckValidationSchema);
                    break;
                  default:
                    assertNever(value);
                }
              }}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === EntryType.Hospital &&
              (<>
                <Field
                  label="Discharge Date"
                  name="discharge.date"
                  placeholder='YYYY-MM-DD'
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>)
            }
            {values.type === EntryType.OccupationalHealthcare &&
              (<>
                <Field
                  label="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  name="sickLeave.startDate"
                  placeholder='YYYY-MM-DD'
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  name="sickLeave.endDate"
                  placeholder='YYYY-MM-DD'
                  component={TextField}
                />
              </>)
            }
            {values.type === EntryType.HealthCheck &&
              <Field
                label="Health Check Rating"
                placeholder="0"
                name="healthCheckRating"
                min={0}
                max={3}
                component={NumberField}
              />
            }
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik >
  );
};

export default AddEntryForm;
