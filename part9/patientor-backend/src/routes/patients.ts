import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

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
    res.status(400).send(error.message);
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

export default router;