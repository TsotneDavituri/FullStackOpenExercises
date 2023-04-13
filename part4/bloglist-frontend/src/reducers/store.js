import notificationReducer from './notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: { notification: notificationReducer },
})

console.log(store.getState())

export default store
