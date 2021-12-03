
const Header = ({ course }) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
  
    )
  }
  
  const Part = ({ part, exercises }) => {
    return (
      <div>
        <p>{part} {exercises}</p>
      </div>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
          {course.parts.map(part =>
            <div key={part.id}>
              <Part part={part.name} exercises={part.exercises}/>
            </div>
          )}
      </div>
    )
  }
  
  const Total = ({ course }) => {

    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <p>
          <b>total of {total} exercises</b>     
        </p>
      </div>
    )
  }

const Course = ({ courses }) => {
    
    return (
      <div>
        {courses.map(course =>
          <div key={course.id}>
            <Header course = {course} />
            <Content course = {course} />
            <Total course = {course} />            
          </div>
        )}
      </div>
    )
}

export default Course;