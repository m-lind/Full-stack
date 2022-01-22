import CountryData from './CountryData'

const FilterResults = ({ dataToShow, handleClick }) => {

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
            <div key={country.name.common}>
              <div>
                {country.name.common}
                <button onClick={() => handleClick(country)}>show</button>
              </div>              
            </div>
        )}
      </div>
    )
  }

export default FilterResults;