import diagnosesData from '../../data/diagnosesEntries';
import { Diagnoses } from '../types';

const diagnoses: Diagnoses[] = diagnosesData;

const getEntries = (): Diagnoses[] => {
  return diagnoses;
};

export default {
  getEntries,
};
