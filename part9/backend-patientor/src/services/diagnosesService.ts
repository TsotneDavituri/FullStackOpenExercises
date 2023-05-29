import diagnosesData from '../../data/diagnosesEntries';
import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};
