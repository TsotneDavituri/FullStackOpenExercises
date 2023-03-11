import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifiction, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []
  )

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

  const handleCreation = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url
      }

      await blogService.create(newBlog)

      blogService.setToken(user.token)
      setAuthor('')
      setTitle('')
      setUrl('')
      
      setNotification(`Creation succeeded!`)
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username: 
            <input
              type="text"
              placeholder='enter username' 
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password: 
            <input
              type="password"
              placeholder='enter password'
              name="password" 
              value={password}
              onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification message={errorMessage}/>
      <Notification message={notifiction}/>
      <div>{user.name} is logged in
        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          window.location.reload()
        }}>logout</button>
      </div>
      <h2>Create new</h2>
      <form onSubmit={handleCreation}>
        <div>
          title:
          <input type="text" 
          name="title" 
          value={title}
          onChange={({ target }) => setTitle(target.value)}>
          </input>
        </div>
        <div>
          author:
          <input type="text" 
          name="author" 
          value={author}
          onChange={({ target }) => setAuthor(target.value)}>
          </input>
        </div>
        <div>
          url:
          <input 
          type="text" 
          name="url" 
          value={url}
          onChange={({ target }) => setUrl(target.value)}>
          </input>
        </div>
        <button type="submit">submit</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

export default App