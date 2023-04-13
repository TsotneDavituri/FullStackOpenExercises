import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = user => {
  console.log(user)
  const blogs = useSelector(state => state.blogs)

  const sortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      {sortedByLikes.map(blog => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  )
}

export default BlogList
