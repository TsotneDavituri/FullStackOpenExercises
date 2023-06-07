import patientsData from '../../data/patientsEntries';
import { NewPatientEntry, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const entriesWithoutSsn = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  entriesWithoutSsn,
  addPatient,
};
