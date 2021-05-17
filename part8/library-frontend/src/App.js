import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(window.localStorage.getItem('library-user-token'));
  const client = useApolloClient();

  const handleLogout = () => {
    setToken(null);
    window.localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')} disabled={!token}>Add Book</button>
        {token
          ? <button onClick={handleLogout}>Log Out</button>
          : <button onClick={() => setPage('login')}>Log In</button>}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken}/>

    </div>
  );
};

export default App;