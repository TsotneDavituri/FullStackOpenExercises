import { CoursePartArray } from '../types'

const Total = ({ courses }: CoursePartArray) => {
  return (
    <p>
      Number of exercises{' '}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}
export default Total
