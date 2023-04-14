import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    password: '',
    user: null,
    token: '',
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
      const token = blogService.setToken(state.token)
      return token
    },
  },
})

export const { setUsername, setPassword, setToken, setUser } =
  loginSlice.actions

export default loginSlice.reducer
