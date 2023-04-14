import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(state => state.users.users)
  const user = useSelector(state => state.login.user)

  return (
    <>
      <h2>{user.name}</h2>

      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}
