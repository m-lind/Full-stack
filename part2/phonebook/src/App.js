import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
     number: '040-1231244'}
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, setShowPersons] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = showPersons
    ? persons.filter(person => person.name.toLowerCase().includes(showPersons))
    : persons

  const handlePhonebookChange = (event) => setNewName(event.target.value)
  const handlePhoneNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setShowPersons(event.target.value.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input 
          onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handlePhonebookChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handlePhoneNumberChange}
          />          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => 
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App
