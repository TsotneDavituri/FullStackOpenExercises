import axios from 'axios';
import { Patient, PatientFormValues, EntryWithoutId } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (object: EntryWithoutId, id: string | undefined) => {
  const { data } = await axios.post<EntryWithoutId>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  console.log(data);
  return data;
};

export default {
  getAll,
  create,
  createEntry,
};
