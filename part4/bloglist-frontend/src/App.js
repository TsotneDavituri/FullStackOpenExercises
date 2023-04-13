import { useEffect } from 'react'
import './index.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import LoggedIn from './components/LoggedIn'
import { setUser } from './reducers/loginReducer'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {!user && (
        <>
          <Notification />
          <LoginForm />
        </>
      )}
      {user && <LoggedIn />}
    </div>
  )
}

export default App
