
const Course = ({ course }) => {

    return (
      <>
      <h1>Web development curriculum</h1>
        {course.map(course =>
          <div key={course.id}>
            <Header course={course.name} />
  
            <Content key={course.parts.id} parts={course.parts} />
  
            <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
          </div>)}
      </>
    )
  }

  const Header = ({ course }) => <h2>{course}</h2>
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </>
    )
  
  }
  
  const Part = ({ part }) =>
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Total = ({ sum }) => <h3>Number of exercises: {sum}</h3>

  export default Course
