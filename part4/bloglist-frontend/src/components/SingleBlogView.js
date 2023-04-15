import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { setBlog } from '../reducers/blogReducer'
import { increaseLike } from '../reducers/blogReducer'

const SingleBlogView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const blog = useSelector(state => state.blogs.singleBlog)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(setBlog(id))
      } catch (e) {
        dispatch(
          setNotification('Error fetching blog and user data', 5, 'error')
        )
      }
    }

    fetchData()
  }, [dispatch, id])

  return (
    <>
      {blog && (
        <>
          <Notification />
          <h2>{blog.title}</h2>
          <a href={`https://${blog.url}`}>{blog.url}</a>
          <div>{blog.likes} likes</div>
          <button onClick={() => dispatch(increaseLike(blog.id))}>like</button>
          <div>added by {blog.user.name}</div>
        </>
      )}
    </>
  )
}

export default SingleBlogView
