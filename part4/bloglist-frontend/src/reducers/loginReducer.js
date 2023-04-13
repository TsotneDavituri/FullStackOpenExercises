import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    password: '',
    user: null,
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
  },
})

export const { setUsername, setPassword, setToken, setUser } =
  loginSlice.actions

export default loginSlice.reducer
