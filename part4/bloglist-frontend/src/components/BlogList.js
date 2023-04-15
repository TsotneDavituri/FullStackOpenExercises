import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Notification from './Notification'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs.blogs)

  const sortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      <Notification />
      <Table striped>
        <thead>
          <th>Blogs</th>
          <th>Authors</th>
        </thead>
        <tbody>
          {sortedByLikes.map(blog => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList
