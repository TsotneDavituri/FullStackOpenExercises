import { Patient, Diagnosis, HealthCheckEntry, Entry } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HealthCheckEntryComponent = ({
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

  if (patient) {
    const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => {
      return 'healthCheckRating' in entry;
    };

    return (
      <>
        <div>
          {isHealthCheckEntry(entry) && (
            <>
              <div>
                Date: {entry.date} Healthcheck <MedicalServicesIcon />
              </div>
              <div>Description: {entry.description}</div>
              <div>
                Health check rating: {entry.healthCheckRating}
                <FavoriteIcon style={{ color: 'red' }} />
              </div>
              <div>Diagnosed by: {entry.specialist}</div>
              <ul>
                {entry.diagnosisCodes?.map(code => {
                  const diagnosis = diagnoses.find(d => d.code === code);
                  return renderDiagnosis(diagnosis);
                })}
              </ul>
            </>
          )}
        </div>
      </>
    );
  }

  return <div>couldn't find patient...</div>;
};

export default HealthCheckEntryComponent;
