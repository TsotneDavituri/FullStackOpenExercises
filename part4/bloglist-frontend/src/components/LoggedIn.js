import { useSelector } from 'react-redux'
import Notification from './Notification'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import BlogList from './BlogList'

const LoggedIn = () => {
  const user = useSelector(state => state.login.user)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
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

      <Togglable buttonLabel="new blog" closingLabel="cancel">
        <CreateBlog />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default LoggedIn
