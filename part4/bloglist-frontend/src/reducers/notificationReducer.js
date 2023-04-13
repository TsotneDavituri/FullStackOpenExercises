import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, time, type) => {
  return async (dispatch) => {
    dispatch(showNotification({ message, type }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
