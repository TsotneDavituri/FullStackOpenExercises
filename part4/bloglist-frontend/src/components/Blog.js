import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { increaseLike, setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDelete = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.del(blog.id)
      dispatch(setBlogs(blogs.filter(b => b.id !== blog.id)))
      dispatch(setNotification('Blog deleted', 5, 'success'))
    }
  }

  return (
    <div style={blogStyle} className={'blog'}>
      <div className="authorTitle">
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="view" closingLabel="hide">
        <div>{blog.url}</div>
        <div>{blog.link}</div>
        <div>
          {blog.likes}
          <button
            id="likeButton"
            onClick={() => dispatch(increaseLike(blog.id))}
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          {user.user.id === blog.user.id ? (
            <button id="removeButton" onClick={() => handleDelete(blog)}>
              remove
            </button>
          ) : null}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
