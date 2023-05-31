import patientsData from '../../data/patientsEntries';
import { Patient } from '../types';

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const entriesWithoutSsn = () : Patient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

export default {
  getEntries,
  entriesWithoutSsn
};
