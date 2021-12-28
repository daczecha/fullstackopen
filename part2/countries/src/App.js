import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState([]);
  
  function handleFilter(event){
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
  
  return (
    <>
      find countries <input type="text" value={filter} onChange={handleFilter}/>
      {
        filtered.length > 0 && filtered.length<250?
          filtered.length >= 10 ?
            <p>Too many matches, specify another filter</p>
            :

            filtered.length === 1 ?
            filtered.map((country)=>{
                return(
                <div key={country.cca2}>
                  <h2>{country.name.common}</h2>
                  <p>capital {country.capital}</p>
                  <p>population {country.population}</p>

                  <h3>languages</h3>
                  <ul>
                    {
                      Object.keys(country.languages).map(function(key, index) {
                        return <li key={country.languages[key]}>{country.languages[key]}</li>
                      })
                    }
                  </ul>
                  <div style={{fontSize:'180px'}}>
                    {country.flag}
                  </div>
                </div>
                );
              }
            )
            : 
            filtered.map((country)=>
              <p key={country.cca2}>{country.name.common}</p>
            )
          :
          <p>{filter.length ? 'country with that name doesn\'t exist':'search country'}</p>
      }
    </>
  );
}

export default App;
