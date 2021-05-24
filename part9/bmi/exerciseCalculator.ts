interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = periodLength ? totalHours / periodLength : 0;
  const success = average >= target;

  let rating;
  let ratingDescription;
  
  if (success) {
    rating = 3;
    ratingDescription = 'You met your exercise target!'
  } else if (average > 0.5 * target) {
    rating = 2;
    ratingDescription = "You are 50% there"
  } else {
    rating = 1;
    ratingDescription = "You can do better"
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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));