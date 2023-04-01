import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification, hideNotification } from "../reducers/notificationReducer";

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log(content)
        dispatch(createAnecdote(content))
        dispatch(showNotification(<>Added: <strong>{content}</strong></>))
        setTimeout(() => {
          dispatch(hideNotification())
        }, 5000)
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