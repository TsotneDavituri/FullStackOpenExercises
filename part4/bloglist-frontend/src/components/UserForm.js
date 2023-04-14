import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import { getSingleUser } from '../reducers/userReducer'

const UserForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const saveId = async event => {
    event.preventDefault()
    try {
      const id = event.target.id.value
      const letssee = await dispatch(getSingleUser(id))
      console.log(letssee)
      navigate(`/users/${id}`)
    } catch (e) {
      dispatch(setNotification('Invalid id', 5, 'error'))
    }
  }

  return (
    <>
      <h2>Enter user id:</h2>
      <Notification />
      <form onSubmit={saveId}>
        <input name="id" />
        <button type="submit">confirm</button>
      </form>
    </>
  )
}

export default UserForm
