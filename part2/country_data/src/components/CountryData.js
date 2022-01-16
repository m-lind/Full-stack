import React from 'react'

const CountryData = ({ country }) => {

    const languages = Object.values(country.languages)
    
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
        </div>
    )
}

export default CountryData;