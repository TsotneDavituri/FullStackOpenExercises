import { CoursePartsArray } from '../types'

const Total = (props: CoursePartsArray) => {
  return (
    <p>
      Number of exercises{' '}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}
export default Total
