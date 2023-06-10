import { Patient, Diagnosis } from '../types';
import { useParams } from 'react-router-dom';

const PatientPage = ({
  patients,
  diagnoses,
}: {
  patients: Patient[];
  diagnoses: Diagnosis[];
}) => {
  const id = useParams().id;
  const patient = patients.find(p => p.id === id);

  const renderDiagnosis = (diagnosis: Diagnosis | undefined) => {
    if (diagnosis) {
      return (
        <li key={diagnosis.name}>
          {diagnosis.code} {diagnosis.name}
        </li>
      );
    }
    return null;
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
            <div key={entry.id}>
              <div>Date: {entry.date}</div>
              <div>Description: {entry.description}</div>
              <ul>
                {entry.diagnosisCodes?.map(code => {
                  const diagnosis = diagnoses.find(d => d.code === code);
                  return renderDiagnosis(diagnosis);
                })}
              </ul>
            </div>
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
