import { useState, useEffect } from "react";
import axios from "axios";
import Info from "./Info";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState({});

  const [info, setInfo] = useState({});
  const [show, setShow] = useState(false);
  
  function handleFilter(event){
    setShow(false);
    setFilter(event.target.value);
  }

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>setCountries(response.data));
  },[]);

  useEffect(()=>{
    setFiltered(
      countries.filter(
        (country)=>
          country
          .name
          .common
          .toLowerCase()
          .includes(
            filter.toLowerCase()
          )
      )
    );
  },[filter]);

  
  
  function handleShow(cca2){
    setInfo(
      countries.filter(
        (country)=>
        country.cca2 === cca2
        )
        );
        
    setShow(true);
  }

  return (
    <>
      find countries <input type="text" value={filter} onChange={handleFilter}/>
      {
        show ? 
          <Info country={info[0]} key={info[0].cca2}/>
        :
        filtered.length > 0 && filtered.length<250?
          filtered.length >= 10 ?
            <p>Too many matches, specify another filter</p>
            :
            filtered.length === 1 ?
            filtered.map((country)=>{
                return(
                  <Info country={country} key={country.cca2}/>
                );
              }
            )
            : 
            filtered.map((country)=>{
              return (
                <div key={country.cca2}>
                  <br></br>
                  {country.name.common} <button onClick={()=>handleShow(country.cca2)}>show</button>
                </div>
              );
            }
            )
          :
          <p>{filter.length ? 'country with that name doesn\'t exist':'search country'}</p>
      }
    </>
  );
}

export default App;
