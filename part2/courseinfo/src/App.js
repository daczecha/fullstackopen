function Part(props){
  return(
    <p>
      {props.part} {props.exercise}
    </p>
  );
}

function Header(props){
  return(
    <h1>{props.course}</h1>
  );
}

function Content(props){
  return(
    <>
      <Part  part = {props.parts[0].name} exercise = {props.parts[0].exercises}/>
      <Part  part = {props.parts[1].name} exercise = {props.parts[1].exercises}/>
      <Part  part = {props.parts[2].name} exercise = {props.parts[2].exercises}/>
    </>
  );
}

function Total(props){
  return(
    <b>total of {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} exercises</b>
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
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }


  return (
    <>
      <Course course={course}/>
    </>
  );
}

export default App;
