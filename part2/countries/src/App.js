import { useEffect, useState } from 'react'
import countryService from './services/countries'

const App = () => {

  const [countryData, setCountryData] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then((response) => {
        setCountryData(response)
      })
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const cityName = filteredCountries[0].capital
      countryService
        .requestWeather(cityName)
        .then((response) => {
          setWeatherData(response)
        })
    }
  }, [filteredCountries])

  const handleFilterChange = (event) => {
    setSearch(event.target.value)
    setFilteredCountries(countryData.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  console.log(weatherData)

  return (
    <>
      Find Country: <input type="text" value={search} onChange={handleFilterChange} placeholder="Enter country" />
      {search.length && filteredCountries.length === 1 ? (
        <>
          <CountryInformation country={filteredCountries} index={0} />
          <DisplayCurrencies country={filteredCountries} index={0} />
          <DisplayLanguages country={filteredCountries} index={0} />
          <DisplayFlag country={filteredCountries} index={0} />
          <Weatherinformation country={filteredCountries} index={0} weatherData={weatherData} />
        </>
      ) : search.length && filteredCountries.length < 10 ? (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSelectedIndex(selectedIndex === index ? -1 : index)}>
                {selectedIndex === index ? "Hide" : "Show"}
              </button>
              {selectedIndex === index && (
                <>
                  <CountryInformation country={filteredCountries} index={index} />
                  <DisplayCurrencies country={filteredCountries} index={index} />
                  <DisplayLanguages country={filteredCountries} index={index} />
                  <DisplayFlag country={filteredCountries} index={index} />
                </>
              )}
            </li>
          ))}
        </ul>
      ) : <p>Too many matches, specify another filter</p>}
    </>
  )
}


const CountryInformation = ({ country, index }) => {
  return (
    <>
      <p style={{ fontWeight: "bold", fontSize: "30px" }}>{country[index].name.common}</p>
      <p></p>
      <p>Capital: {country[index].capital}</p>
      <p>Population: {country[index].population}</p>
      <p>Area: {country[index].area}</p>
    </>
  )
}

const DisplayCurrencies = ({ country, index }) => {
  return (
    <>
      <p>Currencies:</p>
      <ul>
        {Object.keys(country[index].currencies).map(key => (
          <li key={key}>{country[index].currencies[key].symbol} {country[index].currencies[key].name}</li>
        ))}
      </ul>
    </>
  )
}

const DisplayLanguages = ({ country, index }) => {
  return (
    <>
      <p>Languages: </p>
      <ul>
        {Object.keys(country[index].languages).map(key => (
          <li key={key}>{country[0].languages[key]}</li>
        ))}
      </ul>
    </>
  )
}

const DisplayFlag = ({ country, index }) => {
  return (
    <>
      <img src={country[index].flags.svg} alt="flag" style={{ width: '200px', height: '200px' }} />
    </>
  )
}

const Weatherinformation = ({ weatherData, country, index }) => {
  const displayWeatherInformation = () => {
    if (!weatherData || !weatherData.main || !weatherData.wind || !weatherData.weather) {
      return {}
    } else {
      return {
        temp: weatherData.main.temp,
        windSpeed: weatherData.wind.speed,
        weatherIcon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
      }
    }
  }

  const kelvinToCelcius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2)
  }

  const weatherInfo = displayWeatherInformation()

  return (
    <>
      {country.length === 1 ? (
        <>
          <p style={{ fontWeight: "bold", fontSize: "30px" }}>Weather in {country[index].capital}</p>

          {weatherInfo.temp && (
            <div>Temperature: {kelvinToCelcius(weatherInfo.temp)}°C</div>
          )}
          {weatherInfo.weatherIcon && (
            <img src={weatherInfo.weatherIcon} alt="weather" />
          )}
          {console.log(weatherInfo.temp)}
          {weatherInfo.windSpeed && (
            <div>Windspeed: {weatherInfo.windSpeed} m/s</div>
          )}
        </>
      ) : null}
    </>
  )
}

export default App
