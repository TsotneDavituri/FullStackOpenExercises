import ErrorNotification from "./ErrorNotification"

const LoginForm = ({
    handleLogin,
    errorMessage,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange
}) => {
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
              onChange={handleUsernameChange}
              />
          </div>
          <div>
            password: 
            <input
              type="password"
              placeholder='enter password'
              name="password" 
              value={password}
              onChange={handlePasswordChange}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
}

export default LoginForm