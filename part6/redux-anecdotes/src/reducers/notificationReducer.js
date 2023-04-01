import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
        const notification = action.payload
        return notification
      },
      hideNotification(state, action) {
        return null
      }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer