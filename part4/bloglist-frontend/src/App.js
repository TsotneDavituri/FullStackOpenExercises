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

  const handleCreation = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)

      setBlogs([...blogs, createdBlog])

      setNotification('Creation succeeded!')
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('wrong request')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    const returnedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.del(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

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
            <button
              id='logoutButton'
              onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser')
                window.location.reload()
              }}>logout</button>
          </div>

          <Togglable buttonLabel="new blog" closingLabel="cancel">
            <CreateBlog
              createBlog={handleCreation}
            />
          </Togglable>

          {sortedByLikes.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLike={handleLike}
              handleDelete={handleDelete}/>
          )}
        </div>
      }
    </div>
  )
}

export default App