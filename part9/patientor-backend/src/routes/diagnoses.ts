import express from 'express';
import diagnosesService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnosesService.getEntries());
});

export default router;