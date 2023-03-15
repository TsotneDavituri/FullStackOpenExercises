import Togglable from "./Togglable"
import { useState } from "react"

const Blog = ({blog, blogService, user, blogs, setBlogs}) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid', borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: likes + 1 }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setLikes(returnedBlog.likes)
    setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
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
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          {user.name}
        </div>
        <div>
          <button>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog