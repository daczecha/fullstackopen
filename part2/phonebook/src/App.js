import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const handleInput = (event) =>{
    setNewName(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    newName ?
      setPersons(persons.concat(
        {
          name:newName
        }
      )
      ):
      console.log('error');
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person=><p key={person.name}>{person.name}</p>)
      }
    </div>
  )
}

export default App