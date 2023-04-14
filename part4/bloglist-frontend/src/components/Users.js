//import { useSelector } from 'react-redux'
//import LoggedIn from './LoggedIn'
//import blogService from '../services/blogs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'

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
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
