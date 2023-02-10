import axios from 'axios'
import { useEffect, useState } from 'react';

const App = () => {

  const [countryData, setCountryData] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  const baseUrl = 'https://restcountries.com/v3.1'
  const baseWeatherUrl = "http://api.openweathermap.org/data/2.5"

  //test comment
  const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    console.log(request)
    return request.then(response => response.data)
  }

  const requestWeather = () => {
    const request = axios.get(`${baseWeatherUrl}/weather?q=${filteredCountries.capital}`)
    return request.then(response => response.data)
  }

  useEffect(() => {
       getAll()
      .then((response) => {
        setCountryData(response)
      })
  }, [])

  useEffect(() => {
    requestWeather()
   .then((response) => {
     setWeatherData(response)
   })
}, [])



  const handleFilterChange = (event) => {
    setSearch(event.target.value)
    setFilteredCountries(countryData.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <>
      Find Country: <input type="text" value={search} onChange={handleFilterChange} placeholder="Enter country"/>
      {search.length && filteredCountries.length === 1 ? (
        <DisplayCountryStatistics filteredCountries={filteredCountries} index={0}/>
      ) : search.length && filteredCountries.length < 10 ? (
<ul>
  {filteredCountries.map((country, index) => (
    <li key={country.name.common}>
      {country.name.common} 
      <button onClick={() => setSelectedIndex(selectedIndex === index ? -1 : index)}>
        {selectedIndex === index ? "Hide" : "Show"}
      </button>
      {selectedIndex === index && (
        <DisplayCountryStatistics filteredCountries={filteredCountries} index={index}/>
      )}
    </li>
  ))}
</ul>

      ) : <p>Too many matches, specify another filter</p>}
    </>
  )
}

const DisplayCountryStatistics = ({ filteredCountries, index}) => {
  return (
    <>
      <p style={{ fontWeight: "bold", fontSize: "30px" }}>{filteredCountries[index].name.common}</p>
      <p></p>
      <p>Capital: {filteredCountries[index].capital}</p>
      <p>Population: {filteredCountries[index].population}</p>
      <p>Area: {filteredCountries[index].area}</p>
      <p>Currencies:</p>
      <ul>
        {Object.keys(filteredCountries[index].currencies).map(key => (
          <li key={key}>{filteredCountries[index].currencies[key].symbol} {filteredCountries[index].currencies[key].name}</li>
        ))}
      </ul>
      <p>Languages: </p>
      <ul>
        {Object.keys(filteredCountries[index].languages).map(key => (
          <li key={key}>{filteredCountries[0].languages[key]}</li>
        ))}
      </ul>
      <img src={filteredCountries[index].flags.svg} alt="flag" style={{ width: '200px', height: '200px' }} />
      {console.log(filteredCountries[index])}
    </>
  )
}

export default App
