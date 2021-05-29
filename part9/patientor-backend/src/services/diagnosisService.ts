import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosisData;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getEntries,
};