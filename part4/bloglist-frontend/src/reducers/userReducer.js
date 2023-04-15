import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    singleUser: null,
  },
  reducers: {
    setUsers: (state, action) => {
      return { ...state, users: action.payload }
    },
    setSingleUser: (state, action) => {
      return { ...state, singleUser: action.payload }
    },
  },
})

export const { setUsers, setSingleUser } = userSlice.actions

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch(setUsers(users))
  }
}

export const setUser = id => {
  return async dispatch => {
    const user = await userService.getUserById(id)
    dispatch(setSingleUser(user))
  }
}

export default userSlice.reducer
