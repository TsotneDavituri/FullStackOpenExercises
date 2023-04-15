import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { useEffect } from 'react'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'

const User = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const user = useSelector(state => state.users.singleUser)

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(setUser(id))
      } catch (e) {
        dispatch(setNotification('Invalid user id', 5, 'error'))
      }
    }

    getUser()
  }, [dispatch, id, navigate])

  return (
    <>
      {user && (
        <>
          <Notification />
          <h2>Username: {user.name}</h2>
          <h2>Added blogs</h2>
          <ul className="list-group">
            {user.blogs.map(blog => (
              <li className="list-group-item" key={blog.id}>
                {blog.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default User
