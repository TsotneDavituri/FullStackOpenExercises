import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filteredAnecdotes = anecdotes.filter(anecdote => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase())
  })

  const orderedByVotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {orderedByVotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>  {
              dispatch(vote(anecdote.id))
              dispatch(showNotification(<>Voted for: <strong>{anecdote.content}</strong></>))
              setTimeout(() => {
                dispatch(hideNotification())
              }, 5000)
              }}>vote</button>
          </div>
        </div>
      )}
    </div>
  ) 
}

export default AnecdoteList