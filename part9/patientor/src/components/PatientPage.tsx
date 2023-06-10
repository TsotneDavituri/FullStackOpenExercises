import { Patient, Diagnosis, Entry } from '../types';
import { useParams } from 'react-router-dom';
import HospitalEntryComponent from './HospitalEntryComponent';
import HealthCheckEntryComponent from './HealthCheckEntryComponent';
import OccupationalHealthcareEntryComponent from './OccupationalHealthcareEntryComponent';

const PatientPage = ({
  patients,
  diagnoses,
}: {
  patients: Patient[];
  diagnoses: Diagnosis[];
}) => {
  const id = useParams().id;
  const patient = patients.find(p => p.id === id);

  const entryDetails = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <HospitalEntryComponent
            patients={patients}
            diagnoses={diagnoses}
            id={id}
            entry={entry}
          />
        );
      case 'HealthCheck':
        return (
          <HealthCheckEntryComponent
            patients={patients}
            diagnoses={diagnoses}
            id={id}
            entry={entry}
          />
        );
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcareEntryComponent
            patients={patients}
            diagnoses={diagnoses}
            id={id}
            entry={entry}
          />
        );
      default:
        return null;
    }
  };

  if (patient) {
    return (
      <>
        <h2>{patient.name}</h2>
        <div>SSN: {patient.ssn}</div>
        <div>Occupation: {patient.occupation}</div>
        <div>Gender: {patient.gender}</div>
        <h2>Entries</h2>
        <div>
          {patient.entries.map(entry => (
            <div key={entry.id}>{entryDetails(entry)}</div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div>could not find patient...</div>
    </>
  );
};

export default PatientPage;
