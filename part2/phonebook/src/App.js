import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, setShowPersons] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

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
      <Filter handleFilterChange = {handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        addPerson = {addPerson} 
        newName = {newName} 
        handlePhonebookChange = {handlePhonebookChange} 
        newNumber = {newNumber} 
        handlePhoneNumberChange = {handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow}/>
    </div>
  )
}

export default App
