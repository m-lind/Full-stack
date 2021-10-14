import React, { useState } from 'react'

const Display = ({ anecdote }) => <div>{anecdote}</div>

const PointsDisplay = ({ points }) => <div>has {points} votes</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Random = () => Math.floor(Math.random()*7)

const Header = ({ header }) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(Random())
  const [points, setPoints] = useState(new Array(7).fill(0))

  const copy = [...points]

  const handleVoteClick = () => {
    copy[selected] += 1
    setPoints(copy)
  }

  const handleNextClick = () => {
    setSelected(Random())
  }
  
  const header1 = 'Anecdote of the day'
  const header2 = 'Anecdote with most votes'
  const mostVotesInd = copy.indexOf(Math.max(...copy))

  return (
    <div>
      <Header header = {header1} />  
      <Display anecdote={anecdotes[selected]} />
      <PointsDisplay points={points[selected]} />
      <Button handleClick={handleNextClick} text='next anecdote'/>
      <Button handleClick={handleVoteClick} text='vote'/>
      <Header header = {header2} />
      <Display anecdote={anecdotes[mostVotesInd]} />
      <PointsDisplay points={points[mostVotesInd]} />
    </div>
  )
}

export default App
