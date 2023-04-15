import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'

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

  return (
    <>
      <h2>Create new</h2>
      <Notification />
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id="titleInput" type="text" name="title" placeholder="title" />
        </div>
        <div>
          author:
          <input
            id="authorInput"
            type="text"
            name="author"
            placeholder="author"
          />
        </div>
        <div>
          url:
          <input id="urlInput" type="text" name="url" placeholder="url" />
        </div>
        <button id="submitButton" type="submit">
          submit
        </button>
      </form>
    </>
  )
}

export default CreateBlog
