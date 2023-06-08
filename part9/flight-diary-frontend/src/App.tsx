import { useEffect, useState } from 'react';
import { getAllDiaries } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  return (
    <>
      <h1>Diary entries</h1>
      <div>
        {diaries.map(m => (
          <div key={m.id}>
            {' '}
            {m.date} {m.weather} {m.visibility}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
