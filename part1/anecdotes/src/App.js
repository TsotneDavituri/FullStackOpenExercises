import { useState } from 'react'

const Button = props => <button onClick={props.click}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ]

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
  const [selected, setSelected] = useState(0)

  const handleClick = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const copy = [...votes]

  const increaseVote = () => {
    copy[selected] += 1
    setVotes(copy)
  }

  const index = copy.indexOf(Math.max(...copy))

  return (
    <div>
      <p></p>
      <h1>Anecdote of the day:</h1>
      <div>{anecdotes[selected]}</div>
      <p></p>
      <Button click={increaseVote} text="Vote" />
      <Button click={handleClick} text="Next Anecdote" />
      <p></p>

      <p></p>
      <h1>Anecdote with the most votes:</h1>
      <p></p>
      <div>{anecdotes[index]}</div>
      <p></p>
      <div>Has {copy[selected]} votes</div>
    </div>
  )
}

/* () => getRandomAnecdote(getRandomInt(anecdotes.length)) */

export default App
