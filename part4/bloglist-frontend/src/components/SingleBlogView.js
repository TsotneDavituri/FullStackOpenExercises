import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { setBlog } from '../reducers/blogReducer'
import { increaseLike } from '../reducers/blogReducer'
import { createComment, initilizeComments } from '../reducers/commentReducer'
import { Form, Button, Table } from 'react-bootstrap'

const SingleBlogView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const blog = useSelector(state => state.blogs.singleBlog)
  const comments = useSelector(state => state.comments)

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
    dispatch(createComment({ content: content }, blog.id))
  }

  const styleHeader = {
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#444444',
  }

  const style = {
    fontWeight: 'bold',
    color: '#444444',
  }

  return (
    <>
      {blog && (
        <>
          <Notification />
          <h2 style={styleHeader}>
            {blog.title} by {blog.author}
          </h2>
          <a href={`https://${blog.url}`}>{blog.url}</a>
          <div style={style}>{blog.likes} likes</div>
          <Button
            className="primary"
            onClick={() => dispatch(increaseLike(blog.id))}
          >
            like
          </Button>
          <div style={style}>added by {blog.user.name}</div>
          <h2 style={styleHeader}>Comments</h2>
          <Form.Group>
            <Form onSubmit={addComment}>
              <Form.Control name="comment" />
              <Button className="primary" type="submit">
                add comment
              </Button>
            </Form>
          </Form.Group>
          {comments && (
            <Table striped>
              <tbody>
                {comments.map((c, index) => (
                  <tr
                    key={c.id}
                    style={
                      index % 2 === 0
                        ? { backgroundColor: '#9fc5e8' }
                        : { backgroundColor: '#b2d2ea' }
                    }
                  >
                    <td style={style}>{c.content}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  )
}

export default SingleBlogView
