import React from 'react';

const Anecdote = ({ anecdote, voteAnecdote }) => {
  if (!anecdote) {
    return null;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <button onClick={() => voteAnecdote(anecdote.id)}>
        vote
      </button>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  );
};

export default Anecdote;