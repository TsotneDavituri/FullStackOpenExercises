import { CoursePartArray } from '../types'

const Content = ({ courses }: CoursePartArray) => {
  return (
    <>
      {courses.map(course => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  )
}

export default Content
