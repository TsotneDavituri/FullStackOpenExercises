import axios from 'axios';
import { DiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then(response => response.data);
};

export const addNewDiaryEntry = (
  diaryEntry: unknown,
  setNotification: (message: string | null) => void
) => {
  return axios
    .post(baseUrl, diaryEntry)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        setNotification(error.response.data);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    });
};
