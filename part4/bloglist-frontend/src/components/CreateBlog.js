import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const CreateBlog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreation = async blogObject => {
    try {
      const createdBlog = await blogService.create(blogObject)

      dispatch(setBlogs([...blogs, createdBlog]))

      dispatch(setNotification('Creation succeeded!', 5, 'success'))
    } catch (exception) {
      dispatch(setNotification('Wrong request', 5, 'error'))
    }
  }

  const addBlog = event => {
    event.preventDefault()
    handleCreation({
      title,
      author,
      url,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="titleInput"
            type="text"
            name="title"
            value={title}
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            id="authorInput"
            type="text"
            name="author"
            value={author}
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            id="urlInput"
            type="text"
            name="url"
            value={url}
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button id="submitButton" type="submit">
          submit
        </button>
      </form>
    </>
  )
}

export default CreateBlog
