import { useEffect, useState } from 'react';
import { getAllDiaries, addNewDiaryEntry } from './diaryService';
import { DiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setdate] = useState('');
  const [visibility, setvisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [notification, setNotification] = useState<string | null>('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const Notification = ({ message }: { message: string | null }) => {
    if (message === null) {
      return null;
    }

    return (
      <div style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>
        {message}
      </div>
    );
  };

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryEntryToAdd = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };
    addNewDiaryEntry(diaryEntryToAdd, setNotification);
  };

  return (
    <>
      <h1>Add new entry</h1>
      <Notification message={notification} />
      <form onSubmit={diaryEntryCreation}>
        <div>
          {' '}
          Date:{' '}
          <input
            type="date"
            value={date}
            placeholder="date"
            onChange={event => setdate(event.target.value)}
          />
        </div>
        <div>
          Weather:{' '}
          <input
            type="radio"
            id="sunny"
            onChange={() => setWeather('sunny')}
            name="weather"
          />
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            id="rainy"
            onChange={() => setWeather('rainy')}
            name="weather"
          />
          <label htmlFor="rainy">rainy</label>
          <input
            type="radio"
            id="cloudy"
            onChange={() => setWeather('cloudy')}
            name="weather"
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            id="stormy"
            onChange={() => setWeather('stormy')}
            name="weather"
          />
          <label htmlFor="stormy">stormy</label>
          <input
            type="radio"
            id="windy"
            onChange={() => setWeather('windy')}
            name="weather"
          />
          <label htmlFor="windy">windy</label>
        </div>
        <div>
          Visibility:{' '}
          <input
            type="radio"
            id="great"
            onChange={() => setvisibility('great')}
            name="visibility"
          />
          <label htmlFor="great">great</label>
          <input
            type="radio"
            id="good"
            onChange={() => setvisibility('good')}
            name="visibility"
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            id="ok"
            onChange={() => setvisibility('ok')}
            name="visibility"
          />
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            id="poor"
            onChange={() => setvisibility('poor')}
            name="visibility"
          />
          <label htmlFor="poor">poor</label>
        </div>
        <div>
          Comment:{' '}
          <input
            value={comment}
            placeholder="comment"
            onChange={event => setComment(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h1>Diary entries</h1>
      <div>
        {diaries.map(m => (
          <div key={m.id}>
            {' '}
            <h3>{m.date}</h3>
            <div>Weather: {m.weather} </div>
            <div>Visibility: {m.visibility} </div>
            <div>Comment: {m.comment} </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
