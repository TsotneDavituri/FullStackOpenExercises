import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { useNotificationDispatch } from '../NotificationContext'


const NewAnecdote = () => {
    const dispatch = useDispatch()
    const notificationDispatch = useNotificationDispatch()

    const addAnecdote =  async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        if (content.length < 5) {
          console.log("hello")
          notificationDispatch({type: 'SHORT'})
          setTimeout(() => {
            notificationDispatch({ type: 'CLEAR' })
          }, 5000)
        } else {
          dispatch(createAnecdote(content))
          notificationDispatch({ type: 'ADD', payload: content})
          setTimeout(() => {
            notificationDispatch({ type: 'CLEAR' })
          }, 5000)
        }
      }

    return (
        <div>
        <h2>Create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote"/></div>
          <button>create</button>
        </form>
        </div>
    )
}

export default NewAnecdote