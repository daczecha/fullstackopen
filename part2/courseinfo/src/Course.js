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



export default function Course(props){
  return(
  <>
    <Header course = {props.course.name}/>
    <Content parts = {props.course.parts}/>
    <Total parts = {props.course.parts}/>
  </>
  );
}