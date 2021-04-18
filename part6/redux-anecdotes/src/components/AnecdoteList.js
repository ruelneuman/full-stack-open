import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteList = ({
  anecdotes,
  voteAnecdote,
  showNotificationWithTimeout
}) => {
  const vote = (id) => {
    voteAnecdote(id);

    const anecdote = anecdotes.find((anecdote) => {
      return anecdote.id === id;
    });

    const message = `Voted for: '${anecdote.content}'`;
    showNotificationWithTimeout(message, 5);
  };

  return (
    <div>
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
    </div>
  );
};

const mapStateToProps = ({ anecdotes, filter }) => {
  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  });

  return {
    anecdotes: filteredAnecdotes
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  showNotificationWithTimeout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);