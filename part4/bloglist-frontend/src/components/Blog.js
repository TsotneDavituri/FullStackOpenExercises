import Togglable from "./Togglable"
import { useState } from "react"
import blogService from '../services/blogs'


const Blog = ({blog, handleLikeIncrease, user}) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid', borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = async () => {
    const updatedBlog = { ...blog, likes: likes + 1 }
    await handleLikeIncrease(blog.id, updatedBlog)
    setLikes(updatedBlog.likes)
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
          <button onClick={handleLikeClick}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog