import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { setBlog } from '../reducers/blogReducer'
import { increaseLike } from '../reducers/blogReducer'
import { createComment, initilizeComments } from '../reducers/commentReducer'

const SingleBlogView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  console.log(id)

  const blog = useSelector(state => state.blogs.singleBlog)
  const comments = useSelector(state => state.comments)
  console.log(comments)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(setBlog(id))
        await dispatch(initilizeComments(id))
      } catch (e) {
        dispatch(
          setNotification('Error fetching blog and user data', 5, 'error')
        )
      }
    }

    fetchData()
  }, [dispatch, id])

  const addComment = event => {
    event.preventDefault()
    const content = event.target.comment.value

    event.target.comment.value = ''
    dispatch(createComment({ content: content, blog: blog.id }))
  }

  return (
    <>
      {blog && (
        <>
          <Notification />
          <h2>
            {blog.title} {blog.author}
          </h2>
          <a href={`https://${blog.url}`}>{blog.url}</a>
          <div>{blog.likes} likes</div>
          <button onClick={() => dispatch(increaseLike(blog.id))}>like</button>
          <div>added by {blog.user.name}</div>
          <h2>Comments</h2>
          <form onSubmit={addComment}>
            <input name="comment" />
            <button type="submit">add comment</button>
          </form>
          {comments && (
            <ul>
              {comments.map(c => (
                <li key={c.id}>{c.content}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  )
}

export default SingleBlogView
