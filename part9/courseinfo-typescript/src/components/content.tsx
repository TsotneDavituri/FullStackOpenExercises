import { CoursePartArray } from '../types'
import Part from './part'

const Content = ({ courses }: CoursePartArray) => {
  return (
    <>
      {courses.map((course, index) => (
        <Part key={index} coursePart={course} />
      ))}
    </>
  )
}

export default Content
