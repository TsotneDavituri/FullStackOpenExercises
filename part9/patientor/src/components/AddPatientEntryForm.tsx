import { SyntheticEvent, useState } from 'react';
import { Diagnosis } from '../types';
import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { EntryTypes } from '../types';

const AddPatientEntryForm = () => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnoses, setDiagnoses] = useState<Diagnosis['code']>('');
  const [entryType, setEntryType] = useState(EntryTypes.healthCheck);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
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

      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnoses}
          onChange={({ target }) => setDiagnoses(target.value)}
        />

        {entryType === EntryTypes.hospital ? (
          <>
            <TextField
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
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
          <TextField
            label="Health check rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
        ) : null}
        {entryType === EntryTypes.occupationalHealthcare ? (
          <>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start date"
              fullWidth
              placeholder="YYYY-MM-DD"
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="Sick leave end date"
              fullWidth
              placeholder="YYYY-MM-DD"
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
