import React, { useState,useEffect} from 'react';

import axios from 'axios';

import Numbers from './components/Numbers';
import New from './components/New';
import Filter from './components/Filter';


const App = () => {
  const [persons, setPersons] = useState([
  ]);


  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filterWord, setFilterWord] = useState('');


  const handleFilterInput = (event) =>{
    setFilterWord(event.target.value);
  }

  const handleNameInput = (event) =>{
    setNewName(event.target.value);
  }
  
  const handleNumberInput = (event) =>{
    setNewNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();


    if (persons.filter(e => e.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
    }else{
      newName && newNumber ?
      setPersons(persons.concat(
        {
          name:newName,
          number: newNumber,
          id: persons.length + 1
        }
      )
      ):
      alert('fill both fields');
    }
    setNewName('');
    setNewNumber('');
  }


  useEffect(()=>{
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
  },[]);

  return (
    <div>
      <Filter filterWord={filterWord} handleFilterInput={handleFilterInput}/>
      <New 
        handleSubmit={handleSubmit}
        newName={newName} 
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <Numbers data = {persons} filterWord ={filterWord}/>
    </div>
  )
}

export default App