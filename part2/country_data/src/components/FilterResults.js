import CountryData from './CountryData'

const FilterResults = ({ dataToShow }) => {
    
    if (dataToShow.length > 10) {
      
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (dataToShow.length === 1) {
  
      return(
        <div>
          {dataToShow.map(country => 
            <CountryData key={country.name.common} country={country}/>
          )}
        </div>
      )   
    }
  
    return (
      <div>
        {dataToShow.map(country => 
            <div key={country.name.common}>{country.name.common}</div>
        )}
      </div>
    )
  }

export default FilterResults;