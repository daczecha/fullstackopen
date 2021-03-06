import { useState } from "react";

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
   
  const [votes, setVotes] = useState([0,0,0,0,0,0,0]);
  const [topIndex, setTopIndex] = useState(0);
  const [selected, setSelected] = useState(0);

  function randomInt(mn,mx){
    let random  = Math.floor(Math.random() * (mx - mn) + mn);
    console.log(random);
    return random;
  }

  function addVote(){
    let temp = [...votes];
    temp[selected] += 1;
    setVotes(temp);

    if(votes[selected] === Math.max(...votes)){
      setTopIndex(selected);
    }
  }

  return (
    <div>
      
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <button onClick={()=>addVote()}>vote</button>
      <button onClick={()=>setSelected(randomInt(0,anecdotes.length))}>next anecdote</button>


      <h1>Anecdote with most votes</h1>
      {anecdotes[topIndex]}
      <p>has {votes[topIndex]} votes</p>
    </div>
  );
}

export default App;
