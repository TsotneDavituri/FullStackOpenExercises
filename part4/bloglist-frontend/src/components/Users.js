import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
