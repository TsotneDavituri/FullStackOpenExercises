import { CoursePartArray } from '../types';

const Total = ({ courses }: CoursePartArray) => {
  return (
    <h3>
      Number of exercises:{' '}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </h3>
  );
};
export default Total;
