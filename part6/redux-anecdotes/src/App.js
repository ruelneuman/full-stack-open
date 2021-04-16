import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const [anecdote, setAnecdote] = useState('');

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  const createAnecdote = (event) => {
    event.preventDefault();
    dispatch(addAnecdote(anecdote));
    setAnecdote('');
  };

  const handleChange = (event) => {
    setAnecdote(event.target.value);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input
            type="text"
            name="anecdote"
            value={anecdote}
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;