import Togglable from './Togglable'

const Blog = ({ blog, user, handleLike, handleDelete }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid', borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className={'blog'}>
      <div className='authorTitle'>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="view" closingLabel="hide">
        <div>
          {blog.url}
        </div>
        <div>
          {blog.link}
        </div>
        <div>
          {blog.likes}
          <button onClick={() => handleLike(blog.id)} >like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          {user.id === blog.user.id ? <button onClick={() => handleDelete(blog)}>remove</button> : null}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog