import { Patient } from '../types';
import { useParams } from 'react-router-dom';

const PatientPage = ({ patients }: { patients: Patient[] }) => {
  console.log(patients);
  const id = useParams().id;
  const patient = patients.find(p => p.id === id);

  if (patient) {
    return (
      <>
        <h2>{patient.name}</h2>
        <div>SSN: {patient.ssn}</div>
        <div>Occupation: {patient.occupation}</div>
        <div>Gender: {patient.gender}</div>
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
