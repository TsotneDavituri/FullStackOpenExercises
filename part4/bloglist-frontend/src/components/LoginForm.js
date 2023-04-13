import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUsername, setPassword } from '../reducers/loginReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.login.username)
  const password = useSelector(state => state.login.password)

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5, 'error'))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            id="usernameInput"
            type="text"
            placeholder="enter username"
            value={username}
            name="username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          password:
          <input
            id="passwordInput"
            type="password"
            placeholder="enter password"
            name="password"
            value={password}
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
