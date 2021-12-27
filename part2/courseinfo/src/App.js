function Part(props){
  return(
    <p>
      {props.part} {props.exercise}
    </p>
  );
}

function Header(props){
  return(
    <h3>{props.course}</h3>
  );
}

function Content(props){
  return(
    <>
      {props.parts.map((part)=><Part part={part.name} exercise={part.exercises} key={part.id}/>)}
    </>
  );
}

function Total(props){
  let a = props.parts.map((part)=>{
    return part.exercises;
  });
  const total = a.reduce(function(a, b) { return a + b; }, 0);
  return(
    <b>total of {total} exercises</b>
  );
}



function Course(props){
  return(
  <>
    <Header course = {props.course.name}/>
    <Content parts = {props.course.parts}/>
    <Total parts = {props.course.parts}/>
  </>
  );
}

function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <>
    <h2>Web development curriculum</h2>
    {
      courses.map((course)=><Course course={course} key={course.id}/>)
    }
    </>
  );
}

export default App;
