interface exerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

export const calculateExercises = (dailyExerciseHours: number[], target: number): exerciseResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = periodLength ? totalHours / periodLength : 0;
  const success = average >= target;

  let rating;
  let ratingDescription;

  if (success) {
    rating = 3;
    ratingDescription = 'You met your exercise target!';
  } else if (average > 0.5 * target) {
    rating = 2;
    ratingDescription = "You are 50% there";
  } else {
    rating = 1;
    ratingDescription = "You can do better";
  }


  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface exerciseArgs {
  dailyExerciseHours: number[];
  target: number;
}

const parseExerciseArguments = (args: Array<string>): exerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map((arg) => Number(arg));

  if (isNaN(target) || dailyExerciseHours.some((arg) => isNaN(Number(arg)))) {
    throw new Error('Not all provided values were numbers');
  }

  return {
    dailyExerciseHours,
    target,
  };
};

if (require.main === module) {
  try {
    const { dailyExerciseHours, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (error) {
    if (error instanceof Error) {
      console.log("An error has occured: ", error.message);
    }
  }
}