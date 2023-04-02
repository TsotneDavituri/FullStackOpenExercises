import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote =  async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(<>Added: <strong>{content}</strong></>, 5))
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