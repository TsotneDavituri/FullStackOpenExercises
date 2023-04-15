import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { useEffect } from 'react'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const User = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const user = useSelector(state => state.users.singleUser)

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(setUser(id))
      } catch (e) {
        dispatch(setNotification('Invalid user id', 5, 'error'))
      }
    }

    getUser()
  }, [dispatch, id, navigate])

  const styleHeader = {
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#444444',
  }

  const style = {
    fontWeight: 'bold',
    color: '#444444',
  }

  return (
    <>
      {user && (
        <>
          <Notification />
          <h2 style={styleHeader}>Username: {user.name}</h2>
          <thead>
            <th style={styleHeader}>Added Blogs</th>
          </thead>
          <Table striped style={{ border: '1px solid purple' }}>
            {user.blogs.map((blog, index) => (
              <tr
                className="list-group-item"
                key={blog.id}
                style={
                  index % 2 === 0
                    ? { backgroundColor: '#9fc5e8', paddingLeft: '10px' }
                    : { backgroundColor: '#b2d2ea', paddingLeft: '10px' }
                }
              >
                <td style={style}>{blog.title}</td>
              </tr>
            ))}
          </Table>
        </>
      )}
    </>
  )
}

export default User
