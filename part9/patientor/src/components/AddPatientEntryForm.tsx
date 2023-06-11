import { useState, SyntheticEvent } from 'react';
import { Diagnosis, EntryWithoutId } from '../types';
import axios from 'axios';
import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import { EntryTypes } from '../types';
import patientService from '../services/patients';

const AddPatientEntryForm = ({
  id,
  setError,
  diagnosesCodes,
}: {
  id: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  diagnosesCodes: Diagnosis[];
}) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnoses, setDiagnoses] = useState<string[]>([]);

  const [entryType, setEntryType] = useState(EntryTypes.healthCheck);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const getDiagnosesCodes = diagnosesCodes.map(diagnosis => diagnosis.code);

  const submitNewEntry = async () => {
    try {
      switch (entryType) {
        case EntryTypes.hospital:
          const hospitalEntry: EntryWithoutId = {
            date: date,
            description: description,
            specialist: specialist,
            diagnosisCodes: diagnoses,
            type: entryType,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          await patientService.createEntry(hospitalEntry, id);
          break;
        case EntryTypes.healthCheck:
          const healthCheckEntry: EntryWithoutId = {
            date: date,
            description: description,
            specialist: specialist,
            diagnosisCodes: diagnoses,
            type: entryType,
            healthCheckRating: Number(healthCheckRating),
          };
          await patientService.createEntry(healthCheckEntry, id);
          break;
        case EntryTypes.occupationalHealthcare:
          const occupationalHealthcareEntry: EntryWithoutId = {
            date: date,
            description: description,
            specialist: specialist,
            diagnosisCodes: diagnoses,
            type: entryType,
            employerName: employerName,
            sickLeave: {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            },
          };
          await patientService.createEntry(occupationalHealthcareEntry, id);
          break;
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
          setTimeout(() => {
            setError('');
          }, 5000);
        } else {
          setError('Unrecognized axios error');
          setTimeout(() => {
            setError('');
          }, 5000);
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    void submitNewEntry();
  };

  const onCancel = () => {
    return null;
  };

  interface EntryOption {
    value: EntryTypes;
    label: string;
  }

  const entryOptions: EntryOption[] = Object.values(EntryTypes).map(v => ({
    value: v,
    label: v.toString(),
  }));

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const currentEntry = Object.values(EntryTypes).find(
        g => g.toString() === value
      );
      if (currentEntry) {
        setEntryType(currentEntry);
      }
    }
  };

  return (
    <div>
      <h2>Select Entry Type: </h2>
      <Select
        label="Entry Type"
        fullWidth
        value={entryType}
        onChange={onEntryTypeChange}
      >
        {entryOptions.map(option => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <h2>New Entry</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          fullWidth
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            multiple
            value={diagnoses}
            onChange={({ target }) => setDiagnoses(target.value as string[])}
            renderValue={selected => (
              <div>
                {selected.map(value => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            {getDiagnosesCodes.map(code => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {entryType === EntryTypes.hospital ? (
          <>
            <h3>Discharge date: </h3>
            <TextField
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        ) : null}
        {entryType === EntryTypes.healthCheck ? (
          <FormControl fullWidth>
            <InputLabel id="health-check-rating-label">
              Health check rating
            </InputLabel>
            <Select
              labelId="health-check-rating-label"
              value={healthCheckRating}
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value))
              }
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>LowRisk</MenuItem>
              <MenuItem value={2}>HighRisk</MenuItem>
              <MenuItem value={3}>CriticalRisk</MenuItem>
            </Select>
          </FormControl>
        ) : null}
        {entryType === EntryTypes.occupationalHealthcare ? (
          <>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <h3>Sick leave start date</h3>
            <TextField
              fullWidth
              type="date"
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <h3>Sick leave start date</h3>
            <TextField
              fullWidth
              type="date"
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        ) : null}
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientEntryForm;
