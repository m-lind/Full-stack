import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPersons, setShowPersons] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleClick = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotificationMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
        })
    } 
  }

  const hook = () => {
    axios
      .get('/api/persons')
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
            setNotificationMessage(`Updated phone number for ${returnedPerson.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 4000)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== person.id))
            setErrorMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 4000)
          })        
      }
      setNewName('')
      setNewNumber('')

    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 4000)
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
      <ErrorNotification message={errorMessage} />
      <Notification message={notificationMessage} />
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
