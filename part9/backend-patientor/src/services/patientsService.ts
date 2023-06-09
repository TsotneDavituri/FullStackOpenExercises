import patientsData from '../../data/patientsEntries';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const patientInformation = (id: string): Patient | null => {
  const findPatient = patients.find(patient => id === patient.id);
  if (findPatient) return findPatient;
  console.log('Couldnt find patient');
  return null;
};

const nonSensitivePatientEntries = (): NonSensitivePatient[] => {
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
  nonSensitivePatientEntries,
  addPatient,
  patientInformation,
};
