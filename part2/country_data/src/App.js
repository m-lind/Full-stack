import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FilterResults from './components/FilterResults'

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [showData, setShowData] = useState([])

  const handleFilterChange = (event) => setShowData(event.target.value.toLowerCase())

  const dataToShow = showData.length > 0
  ? countries.filter(country => country.name.common.toLowerCase().includes(showData))
  : []
  
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])
  
  return (
    <div>
      find countries
      <input
        onChange={handleFilterChange} 
      />
      <div>
        <FilterResults dataToShow={dataToShow}/>
      </div> 
    </div>
  );
}

export default App;
