import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const LoggedIn = () => {
  const user = useSelector(state => state.login.user)

  return (
    <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#16537e' }}>
      {user.name} is logged in
      <Button
        color="primary"
        id="logoutButton"
        style={{ margin: '5px' }}
        onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          window.location.reload()
        }}
      >
        logout
      </Button>
    </div>
  )
}

export default LoggedIn
