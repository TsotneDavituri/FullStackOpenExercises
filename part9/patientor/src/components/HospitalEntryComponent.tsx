import { Patient, Diagnosis, HospitalEntry, Entry } from '../types';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const HospitalEntryComponent = ({
  patients,
  diagnoses,
  id,
  entry,
}: {
  patients: Patient[];
  diagnoses: Diagnosis[];
  id: string | undefined;
  entry: Entry;
}) => {
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

  const isHospitalEntry = (entry: Entry): entry is HospitalEntry => {
    return 'discharge' in entry;
  };

  if (patient) {
    return (
      <>
        <div>
          {isHospitalEntry(entry) && (
            <>
              <div>
                Date: {entry.date} Hospital <MonitorHeartIcon />
              </div>
              <div>Description: {entry.description}</div>
              <div>Diagnosed by: {entry.specialist}</div>
              <div>Discharged on: {entry.discharge.date}</div>
              <div>Discharge criteria: {entry.discharge.criteria}</div>
            </>
          )}
          <ul>
            {entry.diagnosisCodes?.map(code => {
              const diagnosis = diagnoses.find(d => d.code === code);
              return renderDiagnosis(diagnosis);
            })}
          </ul>
        </div>
      </>
    );
  }

  return <div>couldn't find patient...</div>;
};

export default HospitalEntryComponent;
