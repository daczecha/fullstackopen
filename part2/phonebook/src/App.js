import React, { useState } from 'react';
import Numbers from './components/Numbers';
import New from './components/New';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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