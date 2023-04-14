import { useEffect } from 'react'
import './index.css'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, setToken } from './reducers/loginReducer'
import CreateBlog from './components/CreateBlog'
import BlogList from './components/BlogList'
import LoggedIn from './components/LoggedIn'
import Users from './components/Users'
import Menu from './components/Menu'
import UserForm from './components/UserForm'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
      dispatch(setToken(user.token))
    }
  }, [])

  return (
    <Router>
      <div>
        {!user && <LoginForm />}
        {user && (
          <>
            <div>
              <h2>Blogs App</h2>
              <Menu />
              <LoggedIn />
            </div>

            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user" element={<UserForm />} />
              <Route path="/users/:id" element={<Users />} />
              <Route path="/blogs/:id" element={<Users />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  )
}

export default App
