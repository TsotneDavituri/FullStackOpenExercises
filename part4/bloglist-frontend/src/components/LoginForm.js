import ErrorNotification from './ErrorNotification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  errorMessage,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <ErrorNotification message={errorMessage}/>
      <form onSubmit={handleLogin}>
        <div>
            username:
          <input
            id='usernameInput'
            type="text"
            placeholder='enter username'
            value={username}
            name="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
            password:
          <input
            id='passwordInput'
            type="password"
            placeholder='enter password'
            name="password"
            value={password}
            onChange={handlePasswordChange}/>
        </div>
        <button id='loginButton' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm