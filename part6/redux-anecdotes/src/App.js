import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdotesService from './services/anecdotes';
import { initializeAnecdotes } from './reducers/anecdoteReducer';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>Create New</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;