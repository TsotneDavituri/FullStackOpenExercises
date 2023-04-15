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
            <th style={{ fontWeight: 'bold', fontSize: '24px', color: 'navy' }}>
              Users
            </th>
            <th style={{ fontWeight: 'bold', fontSize: '24px', color: 'navy' }}>
              Blogs created
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr
                key={user.id}
                style={
                  index % 2 === 0
                    ? { backgroundColor: '#9fc5e8' }
                    : { backgroundColor: '#b2d2ea' }
                }
              >
                <td>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`/users/${user.id}`}
                  >
                    {user.name}
                  </Link>
                  {console.log(user.id)}
                </td>
                <td style={{ color: 'navy' }}>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}

export default UserList
