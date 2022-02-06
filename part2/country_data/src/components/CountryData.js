import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CountryData = ({ country }) => {

    const [weatherData, setWeatherData] = useState('')
    const languages = Object.values(country.languages)
    
    const api_key = process.env.REACT_APP_API_KEY
    const city = country.capital

    const hook = () => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
          .then(response => {
            setWeatherData(response.data.current)
          })
    }
    
    useEffect(hook, [api_key, city])
    
    return (
        <div>
            <h1>{country.name.common}</h1> 
            <div>
                capital {country.capital}
            </div>
            <div>
                continent {country.continents}
            </div>
            <h2>languages</h2>
            <div>
                {languages.map(language =>
                <li key={language}>{language}</li>    )}
            </div> 
            <p>       
                <img width='120px' height='auto' src={country.flags.svg} alt="flag"></img>
            </p>
            <h2>Weather in {city}</h2>
            <div>
                <strong>temperature: </strong>
                {weatherData.temperature} Celsius
            </div>
            <div>
                <img src={weatherData.weather_icons} alt="weather"></img>
            </div>
            <div>
                <strong>wind: </strong>
                {weatherData.wind_speed} kilometers/hour direction {weatherData.wind_dir}
            </div>
        </div>
    )
}

export default CountryData;