import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';
import BookTable from './BookTable';

const Recommendations = (props) => {
  if (!props.show) {
    return null;
  }

  const [books, setBooks] = useState([]);
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS);

  const meResult = useQuery(ME, {
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (meResult.data?.me?.favoriteGenre) {
      setFavoriteGenre(meResult.data.me.favoriteGenre);
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } });
    }
  }, [meResult]);

  useEffect(() => {
    if (booksResult.data?.allBooks) {
      setBooks(booksResult.data.allBooks);
    }
  }, [booksResult]);

  if (!booksResult.called || booksResult.loading || meResult.loading) {
    return <div>loading...</div>;
  }

  if (booksResult.error || meResult.error) {
    return <div>Error: Could not load books</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>Your favorite genre: <strong>{favoriteGenre}</strong></div>
      <BookTable books={books} />
    </div>
  );
};

export default Recommendations;