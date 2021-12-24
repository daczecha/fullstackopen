import { useState } from "react";

function Statistics(props){
  return(
    <>
      <h1>statistics</h1>
      {props.statistics.good === 0 && props.statistics.neutral === 0 && props.statistics.bad === 0?
        <p>No feedback</p>:
        <>
          <p>good {props.statistics.good}</p>
          <p>neutral {props.statistics.neutral}</p>
          <p>bad {props.statistics.bad}</p>

          <p>all {props.all}</p>
          <p>average {props.average}</p>
          <p>positive {props.positive}</p>
        </>
      }
      </>
  );
}

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
  

  function statisticsAll(){
    return statistics.good + statistics.neutral + statistics.bad;
  }

  function statisticsAverage(){
    return (statistics.good - statistics.bad)/(statistics.good + statistics.neutral + statistics.bad);
  }

  function statisticsPositive(){
    return (statistics.good + statistics.neutral)/(statistics.good + statistics.neutral + statistics.bad);
  }

  return (
  <>
    <h1>give feedback</h1>
    <button onClick={()=>{voteGood()}}>good</button>
    <button onClick={()=>{voteNeutral()}}>neutral</button>
    <button onClick={()=>{voteBad()}}>bad</button>

    <Statistics statistics={statistics} all={statisticsAll()} average={statisticsAverage()} positive={statisticsPositive()}/>
  </>
  );
}

export default App;
