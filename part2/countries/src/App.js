import axios from 'axios'
import { useEffect, useState } from 'react';

const App = () => {

  const [countryData, setCountryData] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)

  const baseUrl = 'https://restcountries.com/v3.1'

  const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    console.log(request)
    return request.then(response => response.data)
  }

  useEffect(() => {
       getAll()
      .then((response) => {
        setCountryData(response)
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
        <DisplayCountryStatistics filteredCountries={filteredCountries}/>
      ) : search.length && filteredCountries.length < 10 ? (
<ul>
  {filteredCountries.map((country, index) => (
    <li key={country.name.common}>
      {country.name.common} 
      <button onClick={() => setSelectedIndex(index)}>
        {selectedIndex === index ? "Hide" : " Show"}
      </button>
      {selectedIndex === index && (
        <DisplayCountryStatistics filteredCountries={filteredCountries} />
      )}
    </li>
  ))}
</ul>

      ) : <p>Too many matches, specify another filter</p>}
    </>
  )
}

const DisplayCountryStatistics = ({ filteredCountries }) => {
  return (
    <>
      <p style={{ fontWeight: "bold", fontSize: "30px" }}>{filteredCountries[0].name.common}</p>
      <p></p>
      <p>Capital: {filteredCountries[0].capital}</p>
      <p>Population: {filteredCountries[0].population}</p>
      <p>Area: {filteredCountries[0].area}</p>
      <p>Currencies:</p>
      <ul>
        {Object.keys(filteredCountries[0].currencies).map(key => (
          <li key={key}>{filteredCountries[0].currencies[key].symbol} {filteredCountries[0].currencies[key].name}</li>
        ))}
      </ul>
      <p>Languages: </p>
      <ul>
        {Object.keys(filteredCountries[0].languages).map(key => (
          <li key={key}>{filteredCountries[0].languages[key]}</li>
        ))}
      </ul>
      <img src={filteredCountries[0].flags.svg} alt="flag" style={{ width: '200px', height: '200px' }} />
      {console.log(filteredCountries[0])}
    </>
  )
}

export default App
