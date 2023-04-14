import { useSelector } from 'react-redux'

const LoggedIn = () => {
  const user = useSelector(state => state.login.user)

  return (
    <div>
      {user.name} is logged in
      <button
        id="logoutButton"
        onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          window.location.reload()
        }}
      >
        logout
      </button>
    </div>
  )
}

export default LoggedIn
