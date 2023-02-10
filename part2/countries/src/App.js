import axios from 'axios'
import { useEffect, useState } from 'react';

const App = () => {

  const [countryData, setCountryData] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  const baseUrl = 'https://restcountries.com/v3.1'
  const baseWeatherUrl = "http://api.openweathermap.org/data/2.5/weather"
  const API_KEY = process.env.REACT_APP_API_KEY

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

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const cityName = filteredCountries[0].capital
      requestWeather(cityName)
        .then((response) => {
          setWeatherData(response)
        })
    }
  }, [filteredCountries])

  const handleFilterChange = (event) => {
    setSearch(event.target.value)
    setFilteredCountries(countryData.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const requestWeather = (cityName) => {
    const request = axios.get(`${baseWeatherUrl}?q=${cityName}&appid=${API_KEY}`)
    return request.then(response => response.data)
  }

  return (
    <>
      Find Country: <input type="text" value={search} onChange={handleFilterChange} placeholder="Enter country" />
      {search.length && filteredCountries.length === 1 ? (
        <DisplayCountryStatistics filteredCountries={filteredCountries} index={0} weatherData={weatherData} />
      ) : search.length && filteredCountries.length < 10 ? (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSelectedIndex(selectedIndex === index ? -1 : index)}>
                {selectedIndex === index ? "Hide" : "Show"}
              </button>
              {selectedIndex === index && (
                <DisplayCountryStatistics filteredCountries={filteredCountries} index={index} weatherData={null} />
              )}
            </li>
          ))}
        </ul>
      ) : <p>Too many matches, specify another filter</p>}
    </>
  )
}

const DisplayCountryStatistics = ({ filteredCountries, index, weatherData }) => {
  const displayWeather = () => {
    if (weatherData && weatherData.main) {
      return weatherData.main.temp
    } else {
      console.log("request not completed yet")
    }
  }

  const displayWindSpeed = () => {
    if (weatherData && weatherData.wind) {
      return weatherData.wind.speed
    } else {
      console.log("loading")
    }
  }

  const displayWeatherIcon = () => {
    if (weatherData && weatherData.weather) {
      return `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    } else {
      console.log("loading")
    }
  }

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
      {filteredCountries.length === 1 ? (
        <>
          <p style={{ fontWeight: "bold", fontSize: "30px" }}>Weather in {filteredCountries[index].capital}</p>
          <div>Temperature: {displayWeather()}</div>
          <img src={displayWeatherIcon()} />
          <div>Windspeed: {displayWindSpeed()} m/s</div>
        </>
      ) : null}
      {console.log(filteredCountries[index])}
      {console.log(weatherData)}
    </>
  )
}

export default App
