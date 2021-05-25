export const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / (height / 100) ** 2;

  if (bmi < 15) return 'Very severly underweight';

  if (bmi < 16) return 'Severely underweight';

  if (bmi < 18.5) return 'Underweight';

  if (bmi < 25) return 'Normal (healthy weight)';

  if (bmi < 30) return 'Overweight';

  if (bmi < 35) return 'Obese Class I (Moderately obese)';

  if (bmi < 40) return 'Obese Class II (Severely obese)';

  if (bmi >= 40) return 'Obese Class III (Very severely obese)';

  return 'Error: Unable to calculate BMI';
};

interface bmiArgs {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): bmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    if (error instanceof Error) {
      console.log("An error has occured: ", error.message);
    }
  }
}
