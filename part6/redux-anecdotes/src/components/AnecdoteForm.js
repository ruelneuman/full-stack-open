import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteForm = ({ addAnecdote, showNotificationWithTimeout }) => {
  const [formValue, setFormValue] = useState('');

  const createAnecdote = async (event) => {
    event.preventDefault();

    const anecdote = { content: formValue, votes: 0 };

    addAnecdote(anecdote);

    const message = `Added: '${formValue}'`;
    showNotificationWithTimeout(message, 5);

    setFormValue('');
  };

  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  return (
    <form onSubmit={createAnecdote}>
      <div>
        <input
          type="text"
          name="anecdote"
          value={formValue}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

const mapDispatchToProps = {
  addAnecdote,
  showNotificationWithTimeout,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);