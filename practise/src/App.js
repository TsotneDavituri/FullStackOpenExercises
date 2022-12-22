
import { useState } from 'react'


const History = (props) => {
  console.log(props)
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }

  const setToValueNoFunction = (newValue) => {
    setValue(newValue)
  }
  
  return (
    <div>
      {value}
      <Button handleClick={setToValue(1000)} text="thousand"/>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 11)}>increment</button>
      <button onClick={() => setToValueNoFunction(value + 100)}> hundred </button>
    </div>
  )
}

export default App;
