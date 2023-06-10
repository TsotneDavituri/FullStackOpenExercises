import patientsData from '../../data/patientsEntries';
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from '../types';
import { v4 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const patientInformation = (id: string): Patient | null => {
  const findPatient = patients.find(patient => id === patient.id);
  if (findPatient) return findPatient;
  throw new Error('Couldnt find patient');
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

const addNewEntry = (entry: EntryWithoutId, id: string) => {
  const findPatient = patients.find(patient => id === patient.id);
  if (findPatient) {
    switch (entry.type) {
      case 'Hospital':
        const hospitalEntry: Entry = {
          id: uuid(),
          description: entry.description,
          date: entry.date,
          specialist: entry.specialist,
          diagnosisCodes: entry.diagnosisCodes,
          discharge: entry.discharge,
          type: 'Hospital',
        };
        findPatient.entries.push(hospitalEntry);
        return hospitalEntry;

      case 'HealthCheck':
        const healthCheckEntry: Entry = {
          id: uuid(),
          description: entry.description,
          date: entry.date,
          specialist: entry.specialist,
          diagnosisCodes: entry.diagnosisCodes,
          healthCheckRating: entry.healthCheckRating,
          type: 'HealthCheck',
        };
        findPatient.entries.push(healthCheckEntry);
        return healthCheckEntry;

      case 'OccupationalHealthcare':
        const OccupationalHealthcareEntry: Entry = {
          id: uuid(),
          description: entry.description,
          date: entry.date,
          specialist: entry.specialist,
          diagnosisCodes: entry.diagnosisCodes,
          sickLeave: entry.sickLeave,
          employerName: entry.employerName,
          type: 'OccupationalHealthcare',
        };
        findPatient.entries.push(OccupationalHealthcareEntry);
        return OccupationalHealthcareEntry;

      default:
        throw new Error('Could not create new entry');
    }
  }
  throw new Error('Patient does not exist');
};

export default {
  getEntries,
  nonSensitivePatientEntries,
  addPatient,
  patientInformation,
  addNewEntry,
};
