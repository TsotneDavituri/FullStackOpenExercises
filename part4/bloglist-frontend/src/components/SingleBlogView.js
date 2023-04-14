import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { setBlog } from '../reducers/blogReducer'
import { findUsername } from '../reducers/userReducer'
import { increaseLike } from '../reducers/blogReducer'

const SingleBlogView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const blog = useSelector(state => state.blogs.singleBlog)
  const user = useSelector(state => state.users.findUser)

  useEffect(() => {
    const getBlog = async () => {
      try {
        await dispatch(setBlog(id))
        navigate(`/blogs/${id}`)
      } catch (e) {
        dispatch(setNotification('Invalid blog id', 5, 'error'))
      }
    }

    getBlog()
  }, [dispatch, id, navigate])

  useEffect(() => {
    const getUser = async () => {
      if (blog && blog.user) {
        try {
          await dispatch(findUsername(blog.user))
        } catch (e) {
          dispatch(setNotification('Invalid users id', 5, 'error'))
        }
      }
    }

    getUser()
  }, [dispatch, blog])

  return (
    <>
      {blog && (
        <>
          <Notification />
          <h2>{blog.title}</h2>
          <div>{blog.url}</div>
          <div>{blog.likes} likes</div>
          <button onClick={() => dispatch(increaseLike(blog.id))}>like</button>
          {user && <div>added by {user.name}</div>}
        </>
      )}
    </>
  )
}

export default SingleBlogView
