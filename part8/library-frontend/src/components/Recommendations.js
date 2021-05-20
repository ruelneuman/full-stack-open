import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';
import BookTable from './BookTable';

const Recommendations = () => {
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const genre = meData?.me?.favoriteGenre;

  const { data: booksData, loading: booksLoading, error: booksError } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
    fetchPolicy: 'cache-and-network',
  });

  if (booksLoading || meLoading) {
    return <div>loading...</div>;
  }

  if (booksError || meError) {
    return <div>Error: Could not load books</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>Your favorite genre: <strong>{genre}</strong></div>
      <BookTable books={booksData?.allBooks} />
    </div>
  );
};

export default Recommendations;