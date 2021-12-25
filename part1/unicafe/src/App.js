import { useState } from "react";

function StatisticLine(props){
  return(
    <tr>
      <td>
        {props.text} 
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  );
}


function Button(props){
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  );
}

function Statistics(props){
  return(
    <>
      <h1>statistics</h1>
      {props.statistics.good === 0 && props.statistics.neutral === 0 && props.statistics.bad === 0?
        <p>No feedback</p>:
        <>
          <table>
            <tbody>
              <StatisticLine text ='good' value = {props.statistics.good}/>
              <StatisticLine text ='neutral' value = {props.statistics.neutral}/>
              <StatisticLine text ='bad' value = {props.statistics.bad}/>
              
              <StatisticLine text ='all' value = {props.all}/>
              <StatisticLine text ='average' value = {props.average}/>
              <StatisticLine text ='positive' value = {props.positive}/>
            </tbody>
          </table>
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
    <Button text='good' handleClick={()=>{voteGood()}}/>
    <Button text='neutral' handleClick={()=>{voteNeutral()}}/>
    <Button text='bad' handleClick={()=>{voteBad()}}/>

    <Statistics statistics={statistics} all={statisticsAll()} average={statisticsAverage()} positive={statisticsPositive()}/>
  </>
  );
}

export default App;
