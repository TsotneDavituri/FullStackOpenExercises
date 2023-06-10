import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
import toNewEntry from '../entryParser';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.get('/:id', (_req, res) => {
  const findPatient = patientsService
    .getEntries()
    .find(p => p.id === _req.params.id);
  res.send(findPatient);
});

router.post('/', (_req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(_req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (_req, res) => {
  try {
    const newEntry = toNewEntry(_req.body);
    const addedEntry = patientsService.addNewEntry(newEntry, _req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
