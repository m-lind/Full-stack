import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({ header }) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {

  if (text === "positive") {
    return (
      <tr>           
        <td>{text}</td>
        <td>{value} %</td>
      </tr>

    )
  }  
  return (
    <tr>           
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
} 

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + bad + neutral
  const avg = (good + bad * -1)/sum
  const pos = good/sum * 100
  
  if (sum === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={pos} />
        </tbody>
      </table>
    </div>    
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const header1 = 'give feedback'
  const header2 = 'statistics'

  return (
    <div> 
      <Header header = {header1} />     
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <Header header = {header2} />
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </div>

  )
}

export default App
