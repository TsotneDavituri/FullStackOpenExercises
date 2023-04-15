import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Notification from './Notification'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs.blogs)

  const sortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes)

  const style = {
    fontWeight: 'bold',
    fontSize: '24px',
    color: 'navy',
  }

  return (
    <>
      <Notification />
      <Table striped>
        <thead>
          <th style={style}>Blogs</th>
          <th style={style}>Authors</th>
        </thead>
        <tbody>
          {sortedByLikes.map((blog, index) => (
            <tr
              key={blog.id}
              style={
                index % 2 === 0
                  ? { backgroundColor: '#9fc5e8' }
                  : { backgroundColor: '#b2d2ea' }
              }
            >
              <td>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </td>
              <td style={{ color: 'navy' }}>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList
