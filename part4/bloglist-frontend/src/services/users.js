import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const getUserById = async id => {
  const request = axios.get(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export default { getAllUsers, getUserById }
