import React, { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Menu from './components/Menu';
import About from './components/About';
import AnecdoteList from './components/AnecdoteList';
import Footer from './components/Footer';
import CreateNew from './components/CreateNew';
import Anecdote from './components/Anecdote';
import Notification from './components/Notification';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));

    setNotification(`a new anecdote, '${anecdote.content}', was created!`);
    setTimeout(() => {
      setNotification('');
    }, 10000);
  };

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  };

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} voteAnecdote={vote} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;