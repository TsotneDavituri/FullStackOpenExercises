import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const CreateBlog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCreation = async blogObject => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification('Creation succeeded!', 5, 'success'))
    } catch (exception) {
      dispatch(setNotification('Wrong request', 5, 'error'))
    }
  }

  const addBlog = async event => {
    event.preventDefault()
    await handleCreation({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    })
    navigate('/')
  }

  const headerStyle = {
    fontWeight: 'bold',
    fontSize: '24px',
    color: 'navy',
  }

  const labelStyle = {
    fontWeight: 'bold',
    color: 'navy',
  }

  return (
    <>
      <h2 style={headerStyle}>Create new</h2>
      <Notification />
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label style={labelStyle}>Title:</Form.Label>
          <Form.Control
            id="titleInput"
            type="text"
            name="title"
            placeholder="title"
          />
          <Form.Label style={labelStyle}>Author:</Form.Label>
          <Form.Control
            id="authorInput"
            type="text"
            name="author"
            placeholder="author"
          />
          <Form.Label style={labelStyle}>Url:</Form.Label>
          <Form.Control
            id="urlInput"
            type="text"
            name="url"
            placeholder="url"
          />
          <Button color="primary" id="submitButton" type="submit">
            submit
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default CreateBlog
