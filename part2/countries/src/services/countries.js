import axios from 'axios'

const baseCountryUrl = 'https://restcountries.com/v3.1'
const baseWeatherUrl = "http://api.openweathermap.org/data/2.5/weather"
const API_KEY = process.env.REACT_APP_API_KEY

const getAll = () => {
    const request = axios.get(`${baseCountryUrl}/all`)
    return request.then(response => response.data)
  }

const requestWeather = (cityName) => {
    const request = axios.get(`${baseWeatherUrl}?q=${cityName}&appid=${API_KEY}`)
    return request.then(response => response.data)
}

const countryService =  {getAll, requestWeather}

export default countryService