import React, { useState,useEffect} from 'react';
import Numbers from './components/Numbers';
import New from './components/New';
import Filter from './components/Filter';


import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([
  ]);

  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  const [addedName, setAddedName] = useState('');
  const [errorName, setErrorName] = useState('');

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filterWord, setFilterWord] = useState('');



  const addPerson = () => {

    const newPerson ={
        name:newName,
        number: newNumber
    }

    personsService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      });
    
    setAdded(true);
    setAddedName(newPerson.name);
    setTimeout(() => {
      setAdded(false);
      setAddedName('');
    }, 2000);
  }

  const handleDelete = (id) =>{
    const person = persons.filter(person=>person.id === id);

    if (window.confirm(`Delete ${person[0].name} ?`)) {
      personsService
      .remove(id)
      .catch(error=>{
        setError(true);
        setErrorName(person[0].name);
        setTimeout(() => {
          setError(false);
          setErrorName('');
        }, 2000);
      });

      setPersons(persons.filter(person=>person.id !== id));
    }
    
  }

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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){

        const person = persons.find(n => n.name === newName);
        const changedPerson = { ...person, number: newNumber };
        personsService
          .replace(person.id,changedPerson)
          .then(response=>
              setPersons(persons.map(person => person.name !== newName ? person : response.data)));
        
      }
    }else{
      if(newName && newNumber){
        addPerson();
      }else{
        alert('fill both fields');
      }
    }
  }

  useEffect(()=>{
    personsService
      .getAll()
      .then(response => setPersons(response.data))
  },[]);

  return (
    <div>
      <h2>Phonebook</h2>
      {
        added ? <p className='add-message'>Added {addedName}</p> : <></>
      }
      {
        error ? <p className='error'>Information of {errorName} has already been removed from server</p> :<></>
      }
      <Filter filterWord={filterWord} handleFilterInput={handleFilterInput}/>
      <New 
        handleSubmit={handleSubmit}
        newName={newName} 
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <Numbers data = {persons} filterWord ={filterWord} handleDelete={handleDelete}/>
    </div>
  )
}

export default App