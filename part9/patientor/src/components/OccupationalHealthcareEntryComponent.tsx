import {
  Patient,
  Diagnosis,
  OccupationalHealthcareEntry,
  Entry,
} from '../types';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const OccupationalHealthcareEntryComponent = ({
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

  const isOccupationalHealthcareEntry = (
    entry: Entry
  ): entry is OccupationalHealthcareEntry => {
    return 'employerName' in entry;
  };

  if (patient) {
    return (
      <>
        <div>
          {isOccupationalHealthcareEntry(entry) && (
            <>
              <div>
                Date: {entry.date} Occupational healthcare <MonitorHeartIcon />
              </div>
              <div>Description: {entry.description}</div>
              <div>Diagnosed by: {entry.specialist}</div>
              {entry.sickLeave && (
                <>
                  <div>Sick leave start: {entry.sickLeave?.startDate}</div>
                  <div>Sick leave end: {entry.sickLeave?.endDate}</div>
                </>
              )}
              <div>Employer name: {entry.employerName}</div>
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

export default OccupationalHealthcareEntryComponent;
