import React, { useState } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { BOOK_ADDED, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(window.localStorage.getItem('library-user-token'));
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((book) => book.id).includes(object.id);

    try {
      const dataInStore = client.readQuery({ query: ALL_BOOKS });

      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: dataInStore.allBooks.concat(addedBook) }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded.title;
      window.alert(`Added book: ${addedBook}`);
      updateCacheWith(addedBook);
    }
  });

  const handleLogout = () => {
    setPage('authors');
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
        <button onClick={() => setPage('recommendations')} disabled={!token}>Recommendations</button>
        {token
          ? <button onClick={handleLogout}>Log Out</button>
          : <button onClick={() => setPage('login')}>Log In</button>}
      </div>

      {page === 'authors' && <Authors token={token} />}

      {page === 'books' && <Books />}

      {page === 'add' && <NewBook updateCacheWith={updateCacheWith} />}

      {page === 'recommendations' && <Recommendations />}

      {page === 'login' &&
        (<LoginForm
          setToken={setToken}
          setPage={setPage}
        />)}

    </div>
  );
};

export default App;