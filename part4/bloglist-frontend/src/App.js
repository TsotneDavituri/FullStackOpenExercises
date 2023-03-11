import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('User object in local storage:', loggedUserJSON)
    console.log(loggedUserJSON)
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

      console.log('User logged in:', user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      console.log(window.localStorage)
      console.log('Logged in user stored in local storage:', user)

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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <h3>{user.name} is logged in</h3>
      <button>logout</button>

      <h2>Create new</h2>
      <form>
        <div>
          title:
          <input type="text" name="title">
          </input>
        </div>
        <div>
          author:
          <input type="text" name="author">
          </input>
        </div>
        <div>
          url:
          <input type="text" name="url">
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

export default App