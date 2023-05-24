interface BmiValues {
  heightInCm: number;
  weightInKg: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const calculation: number = parseFloat(
    (weightInKg / (heightInCm / 100) ** 2).toFixed(2)
  );

  if (calculation < 18.5) {
    return `Your BMI is ${calculation}, which puts you in category: Underweight`;
  } else if (calculation >= 18.5 && calculation < 25) {
    return `Your BMI is ${calculation}, which puts you in category: Normal (healthy weight)`;
  } else if (calculation >= 25 && calculation < 30) {
    return `Your BMI is ${calculation}, which puts you in category: Overweight`;
  } else if (calculation >= 30) {
    return `Your BMI is ${calculation}, which puts you in category: Obese`;
  } else {
    throw new Error('Could not calculate');
  }
};

try {
  const { heightInCm, weightInKg } = parseArguments(process.argv);
  console.log(calculateBmi(heightInCm, weightInKg));
} catch (e: unknown) {
  let errorMessage = 'Something went wrong.';
  if (e instanceof Error) {
    errorMessage += ' Error: ' + e.message;
  }
  console.log(errorMessage);
}
