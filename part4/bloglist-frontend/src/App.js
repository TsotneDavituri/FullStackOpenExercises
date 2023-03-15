import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifiction, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const sortedByLikes = blogs.sort((a,b) => b.likes - a.likes)

  return (
    <div>

      {!user &&
        <LoginForm
          errorMessage={errorMessage}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      }

      {user &&
        <div>
          <h2>blogs</h2>
          <ErrorNotification message={errorMessage} />
          <Notification message={notifiction} />
          <div>{user.name} is logged in
            <button onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              window.location.reload()
            }}>logout</button>
          </div>

          <Togglable buttonLabel="new blog">
            <CreateBlog
              user={user}
              setNotification={setNotification}
              setErrorMessage={setErrorMessage}
              setBlogs={setBlogs}
              blogs={blogs}
            />
          </Togglable>

          {sortedByLikes.map(blog =>
            <Blog 
            key={blog.id} 
            blog={blog} 
            blogService={blogService} 
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}/>
          )}
        </div>
      }
    </div>
  )
}

export default App