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
        const heightAsNumber = Number(height)
        const weightAsNumber = Number(weight)
        const bmi = calculateBmi(heightAsNumber,weightAsNumber)
        const bmiParams = {
            weight: weight,
            height: height,
            bmi: bmi
        }
        res.json(bmiParams)
    } else {
        const errorJson = {
            error: 'malformatted parameters'
        }
        res.json(errorJson)
    }


});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

