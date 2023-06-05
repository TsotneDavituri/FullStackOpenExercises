import diaryData from '../../data/diaryEntries';
import { DiaryEntry, NonSensitiveDiaryEntry,   Visibility,  Weather } from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (
  date: string, weather: Weather, visibility: Visibility, comment: string
): DiaryEntry => {

const newDiaryEntry = {
  id: Math.max(...diaries.map(d => d.id)) + 1,
  date,
  weather,
  visibility,
  comment,
};

diaries.push(newDiaryEntry);
return newDiaryEntry;
};


const findById = (id: number): DiaryEntry | undefined => { 
   const entry = diaries.find(d => d.id === id); 
    return entry;
  };

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};
