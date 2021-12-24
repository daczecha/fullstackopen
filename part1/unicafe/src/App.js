import { useState } from "react";

function App() {
  const [statistics, setStatistics] = useState(
    {
      good: 0,
      neutral: 0,
      bad: 0
    }
  );

  function voteGood(){
    setStatistics({
      ...statistics,
      good: statistics.good+1
    }
    );
  }
  
  function voteNeutral(){
    setStatistics({
      ...statistics,
      neutral: statistics.neutral+1
    }
    );
  }

  function voteBad(){
    setStatistics({
      ...statistics,
      bad: statistics.bad+1
    }
    );
  }
  
  return (
  <>
    <h1>give feedback</h1>
    <button onClick={()=>{voteGood()}}>good</button>
    <button onClick={()=>{voteNeutral()}}>neutral</button>
    <button onClick={()=>{voteBad()}}>bad</button>

    <h1>statistics</h1>
    <p>good {statistics.good}</p>
    <p>neutral {statistics.neutral}</p>
    <p>bad {statistics.bad}</p>
  </>
  );
}

export default App;
