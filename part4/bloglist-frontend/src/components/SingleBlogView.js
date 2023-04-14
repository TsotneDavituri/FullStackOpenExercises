import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleUser } from '../reducers/userReducer'
import { useEffect } from 'react'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'

const SingleBlogView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const user = useSelector(state => state.users.singleUser)

  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(getSingleUser(id))
        navigate(`/blogs/${id}`)
      } catch (e) {
        dispatch(setNotification('Invalid id', 5, 'error'))
      }
    }

    getUser()
  }, [dispatch, id, navigate])

  return (
    <>
      {user && (
        <>
          <Notification />
          <h2>{user.name}</h2>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default SingleBlogView
