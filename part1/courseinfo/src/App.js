
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
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercisess + props.parts[2].exercises}</p>
  );
}

function App() {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];



  return (
    <>
      <Header course = {course}/>
      <Content parts = {parts}/>
      <Total parts = {parts}/>
    </>
  );
}

export default App;
