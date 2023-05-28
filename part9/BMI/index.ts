import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isArrayOfNumbers } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
  const weight = _req.query.weight;
  const height = _req.query.height;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    const bmiParams = {
      weight: weight,
      height: height,
      bmi: bmi,
    };
    res.json(bmiParams);
  } else {
    const wrongParams = {
      error: 'malformatted parameters',
    };
    res.json(wrongParams);
  }
});

app.post('/exercises', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = _req.body;
  if (!daily_exercises || !target) {
    const missingParams = {
      error: 'Parameters missing',
    };
    res.status(404).json(missingParams);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!isNaN(target) || !isArrayOfNumbers(daily_exercises)) {
    const malformedParams = {
      error: 'Invalid parameters',
    };
    res.status(400).json(malformedParams);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  console.log(result);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
