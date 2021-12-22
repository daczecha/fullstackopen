function Header(props){
  return(
    <h1>{props.course}</h1>
  );
}


function Content(){
  return(
    <></>
  );
}

function Total(props){
  return(
    <p>Number of exercises {props.total}</p>
  );
}

function App() {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;


  return (
    <>
      <Header course={course}/>
      <Content/>
      <Total total = {exercises1 + exercises2 + exercises3}/>
    </>
  );
}

export default App;
