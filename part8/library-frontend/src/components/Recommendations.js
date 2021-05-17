import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';
import BookTable from './BookTable';

const Recommendations = (props) => {
  if (!props.show) {
    return null;
  }

  const allBooksResult = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  if (allBooksResult.loading || meResult.loading) {
    return <div>loading...</div>;
  }

  if (allBooksResult.error || meResult.loading) {
    return <div>Error: Could not load books</div>;
  }

  const favoriteGenre = meResult.data.me?.favoriteGenre;

  const books = allBooksResult.data.allBooks.filter((book) => {
    return book.genres.includes(favoriteGenre);
  });


  return (
    <div>
      <h2>Recommendations</h2>
      <div>Your favorite genre: <strong>{favoriteGenre}</strong></div>
      <BookTable books={books} />
    </div>
  );
};

export default Recommendations;