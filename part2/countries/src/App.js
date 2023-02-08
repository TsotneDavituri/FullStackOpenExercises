import axios from 'axios'
import { useEffect, useState } from 'react';

const App = () => {

  const [countryData, setCountryData] = useState('')

  const baseUrl = 'https://restcountries.com/v3.1'

  const getAll = () => {
    const request = axios.get(`${baseUrl}/'all'`)
    return request.then(response => response.data)
  }

  useEffect(() => {
       getAll()
      .then((response) => {
        setCountryData(response)
      })
  }, [])

  return (
    <>
      <p>find countries: <input type="text">enter country</input></p>
      <div>{countryData}</div>
    </>
  )

}

export default App
