import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
              dispatch(setNotification(<>Voted for: <strong>{anecdote.content}</strong></>, 5))
              }}>vote</button>
          </div>
        </div>
      )}
    </div>
  ) 
}

export default AnecdoteList