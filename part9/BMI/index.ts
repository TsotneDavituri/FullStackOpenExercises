import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
    const weight = _req.query.weight;
    const height = _req.query.height;

    if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
        const bmi = calculateBmi(Number(height),Number(weight));
        const bmiParams = {
            weight: weight,
            height: height,
            bmi: bmi
        };
        res.json(bmiParams);
    } else {
        const wrongParams = {
            error: 'malformatted parameters'
        };
        res.json(wrongParams);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

