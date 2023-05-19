type Operation = 'multiply' | 'add' | 'divide';
type Result = string | number;

const calc = (num1: number, num2: number, operation: Operation): number => {
  switch (operation) {
    case 'divide':
      if (num2 === 0) throw new Error('cant divide through 0');
      return num1 / num2;
    case 'add':
      return num1 + num2;
    case 'multiply':
      return num1 * num2;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
};

try {
  console.log(calc(1, 0, 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
