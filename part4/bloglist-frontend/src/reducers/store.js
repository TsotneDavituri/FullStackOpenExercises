import blogReducer from './blogReducer'
import loginReducer from './loginReducer'
import notificationReducer from './notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
  },
})

console.log(store.getState())

export default store
