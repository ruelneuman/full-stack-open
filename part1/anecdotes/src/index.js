import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ anecdote, votes, text }) => {
  return (
    <div>
      <h1>{text}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votesArray, setVotesArray] = useState(new Array(anecdotes.length).fill(0));


  const addVote = () => {
    const newVotesArray = [...votesArray];
    newVotesArray[selected]++;
    setVotesArray(newVotesArray);
  }

  const getRandomIndex = () => {
    const index = Math.floor((Math.random() * anecdotes.length)); // random index from anecdotes
    setSelected(index);
  }

  const getMostVotesIndex = () => {
    let mostVotes = 0;
    let mostVotesIndex = 0;

    votesArray.forEach((votes, index) => {
      if (votes > mostVotes) {
        mostVotes = votes;
        mostVotesIndex = index;
      }
    });

    return mostVotesIndex;
  }

  const mostVotesIndex = getMostVotesIndex();

  return (
    <div>
      <Anecdote
        anecdote={anecdotes[selected]}
        votes={votesArray[selected]}
        text="Anecdote of the Day"
      />
      <Button onClick={addVote} text="vote"/>
      <Button onClick={getRandomIndex} text="next anecdote"/>
      <Anecdote
        anecdote={anecdotes[mostVotesIndex]}
        votes={votesArray[mostVotesIndex]}
        text="Anecdote with most votes"
      />
    </div>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)