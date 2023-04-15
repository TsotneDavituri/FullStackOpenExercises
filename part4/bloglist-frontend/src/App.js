import { useEffect } from 'react'
import './index.css'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, setToken } from './reducers/loginReducer'
import CreateBlog from './components/CreateBlog'
import BlogList from './components/BlogList'
import LoggedIn from './components/LoggedIn'
import UserList from './components/UserList'
import Menu from './components/Menu'
import User from './components/User'
import SingleBlogView from './components/SingleBlogView'

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
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<SingleBlogView />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  )
}

export default App
