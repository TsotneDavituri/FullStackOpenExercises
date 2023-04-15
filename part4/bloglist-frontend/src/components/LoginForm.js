import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUsername, setPassword } from '../reducers/loginReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const navigate = useNavigate()
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
      navigate('/')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5, 'error'))
    }
  }

  const style = {
    fontWeight: 'bold',
    fontSize: '24px',
    color: 'navy',
  }

  return (
    <div>
      <h2
        style={{
          fontWeight: 'bold',
          fontSize: '32px',
          color: '#160527',
        }}
      >
        Log in to application
      </h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label style={style}>Username:</Form.Label>
          <Form.Control
            id="usernameInput"
            type="text"
            placeholder="enter username"
            value={username}
            name="username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
          <Form.Label style={style}>Password:</Form.Label>
          <Form.Control
            id="passwordInput"
            type="password"
            placeholder="enter password"
            name="password"
            value={password}
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
          <Button color="primary" id="loginButton" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
