interface TrainingData {
  periodLength: number;
  trainingDays: number;
  average: number;
  success: boolean;
  rating: number;
  target: number;
  ratingDescription: string;
}

interface Arguments {
  dailyTrainingHoursTarget: number;
  trainingPeriod: number[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArrayOfNumbers = (numberArray: any): numberArray is number[] => {
  if (!Array.isArray(numberArray)) {
    return false;
  }
  for (const num of numberArray) {
    if (typeof num !== 'number') {
      return false;
    }
  }
  return true;
};

const argumentParse = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const trainingDaysArray: number[] = [];
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('You didnt input numbers!');
    }
    if (i > 2) {
      trainingDaysArray.push(Number(args[i]));
    }
  }

  return {
    dailyTrainingHoursTarget: Number(process.argv[2]),
    trainingPeriod: trainingDaysArray,
  };
};

const calculateDaysTrained = (trainingPeriod: number[]): number => {
  let daysTrained = 0;
  for (let i = 0; i < trainingPeriod.length; i++) {
    if (trainingPeriod[i] !== 0) {
      daysTrained++;
    }
  }
  return daysTrained;
};

const calculateAverageHoursTrainedDaily = (
  trainingPeriod: number[]
): number => {
  let hoursTrained = 0;
  for (let i = 0; i < trainingPeriod.length; i++) {
    hoursTrained += trainingPeriod[i];
  }
  return hoursTrained / trainingPeriod.length;
};

const determineSuccess = (
  averageHoursTrainedDaily: number,
  dailyTrainingHoursTarget: number
): boolean => {
  if (averageHoursTrainedDaily >= dailyTrainingHoursTarget) {
    return true;
  } else {
    return false;
  }
};

const determineRating = (
  averageHoursTrainedDaily: number,
  dailyTrainingHoursTarget: number
): number => {
  const ratingThresholdForMediumRating: number = dailyTrainingHoursTarget * 0.8;

  if (averageHoursTrainedDaily >= dailyTrainingHoursTarget) {
    return 3;
  } else if (averageHoursTrainedDaily >= ratingThresholdForMediumRating) {
    return 2;
  } else {
    return 1;
  }
};

const describeRating = (rating: number): string => {
  if (rating === 1) {
    return 'Try harder next time!';
  } else if (rating === 2) {
    return 'Not bad but you can do better!';
  } else if (rating === 3) {
    return 'Great job!';
  } else {
    return 'Unknown rating';
  }
};

export const calculateExercises = (
  trainingPeriod: number[],
  dailyTrainingHoursTarget: number
): TrainingData => {
  const daysTrained = calculateDaysTrained(trainingPeriod);

  const averageHoursTrainedDaily =
    calculateAverageHoursTrainedDaily(trainingPeriod);

  const success = determineSuccess(
    averageHoursTrainedDaily,
    dailyTrainingHoursTarget
  );

  const rating = determineRating(
    averageHoursTrainedDaily,
    dailyTrainingHoursTarget
  );

  const ratingDescription = describeRating(rating);

  return {
    periodLength: trainingPeriod.length,
    trainingDays: daysTrained,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: dailyTrainingHoursTarget,
    average: averageHoursTrainedDaily,
  };
};

try {
  const { dailyTrainingHoursTarget, trainingPeriod } = argumentParse(
    process.argv
  );
  console.log(calculateExercises(trainingPeriod, dailyTrainingHoursTarget));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
