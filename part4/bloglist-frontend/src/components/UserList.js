import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <>
      <Table striped>
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
                  {console.log(user.id)}
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}

export default UserList
