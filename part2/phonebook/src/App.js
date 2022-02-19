import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, setShowPersons] = useState('')

  const handleClick = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(
          setPersons(persons.filter(p => p.id !== person.id))
        )
    } 
  }

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

    const person = persons.find(singlePerson => singlePerson.name === newName)

    if (person) {      
      const changeNumber = { ...person, number: newNumber }
      
      if (window.confirm((`${newName} is already added to phonebook, replace the old number with a new one?`))) {
        personService
          .update(person.id, changeNumber)
          .then(returnedPerson => {
            setPersons(persons.map(per => per.id !== person.id ? per : returnedPerson))
          })
          .catch(error => {
            alert(
              `the person ${person.name} was already deleted from server`
            )
            setPersons(persons.filter(p => p.id !== person.id))
          })        
      }
      setNewName('')
      setNewNumber('')

    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })      
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
      <Persons personsToShow = {personsToShow} handleClick={handleClick}/>
    </div>
  )
}

export default App
