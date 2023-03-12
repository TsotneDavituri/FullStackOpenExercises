import Togglable from "./Togglable"

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid', borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <div>
          {blog.url}
        </div>
        <div>
          {blog.link}
        </div>
        <div>
          {blog.likes} 
          <button>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog