import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExerciseHours, target } = req.body;

  const isNumber = (item: unknown) => typeof item === 'number' && !isNaN(item);

  const isArrayOfNumbers = (arg: number[]): boolean => {
    return Array.isArray(arg) && arg.length > 0 && arg.every((item) => isNumber(item));
  };

  if (!dailyExerciseHours || target == null) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!isArrayOfNumbers(dailyExerciseHours) || !isNumber(target)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(dailyExerciseHours, target);

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});