import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const updatedPatient = patientService.addEntry(req.params.id, newEntry);

    if (!updatedPatient) {
      res.status(400).send({ error: "invalid patient id" });
    } else {
      res.json(updatedPatient);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;