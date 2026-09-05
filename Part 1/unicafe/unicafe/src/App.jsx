import { useState } from 'react'
import Statistics from './statistics'
import Button from './Button'
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  
  const addgood = () =>
    {setGood(good + 1)
    setAll(all + 1)
    setAverage((good + 1 - bad) / (all + 1))
    setPositive(((good + 1) / (all + 1)) * 100)
    }
  const addneutral = () =>
    {setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good - bad) / (all + 1))
    setPositive(((good) / (all + 1)) * 100)
    }
  const addbad = () =>
    {setBad(bad + 1)
    setAll(all + 1)
    setAverage((good - bad - 1) / (all + 1))
    setPositive(((good) / (all + 1)) * 100)
    }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addgood}>good</button>
      <button onClick={addneutral}>neutral</button>
      <button onClick={addbad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App