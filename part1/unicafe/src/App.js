import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text={props.goodText} value={props.goodAmount} />
        <StatisticsLine text={props.neutralText} value={props.neutralAmount} />
        <StatisticsLine text={props.badText} value={props.badAmount} />
        <StatisticsLine text={props.scoreText} value={props.scoreAmount} />
        <StatisticsLine text={props.positiveText} value={props.positiveAmount} />
        <StatisticsLine text={props.totalText} value={props.totalAmount} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [goodCount, setGoodCount] = useState(0)
  const [badCount, setbadCount] = useState(0)

  const goodValue = (newValue) => {
    setGood(newValue)
    setGoodCount(newValue)
  }

  const neutralValue = (newValue) => {
    setNeutral(newValue)
  }

  const badValue = (newValue) => {
    setBad(newValue)
    setbadCount(-newValue)
  }

  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={() => goodValue(good + 1)} text="Good" />
      <Button handleClick={() => neutralValue(neutral + 1)} text="Neutral" />
      <Button handleClick={() => badValue(bad + 1)} text="Bad" />

      <h2>Statistics</h2>

      <Statistics goodText="Amount of good: " goodAmount={good}
        neutralText="Amount of neutral: " neutralAmount={neutral}
        badText="Amount of bad: " badAmount={bad}
        scoreText="Average score: " scoreAmount={(goodCount + badCount) / (good + bad + neutral)}
        positiveText="Positive: " positiveAmount={good / (good + bad + neutral) * 100 + "%"}
        totalText="Total: " totalAmount={good + bad + neutral}
        total={good + bad + neutral}
      />
    </div>
  )
}

export default App
