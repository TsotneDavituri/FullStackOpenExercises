import blogReducer from './blogReducer'
import loginReducer from './loginReducer'
import notificationReducer from './notificationReducer'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
  },
})

console.log(store.getState())

export default store
