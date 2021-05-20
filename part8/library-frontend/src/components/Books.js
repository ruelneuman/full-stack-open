import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import BookTable from './BookTable';

const Books = () => {
  const [filter, setFilter] = useState('all');

  const { data: booksData, loading: booksLoading, error: booksError } = useQuery(ALL_BOOKS);

  const genres = [...(new Set(booksData?.allBooks.flatMap((book) => book.genres)))];
  const options = ['all'].concat(genres);

  const { data: filteredBooksData, loading: filteredBooksLoading, error: filteredBooksError } = useQuery(ALL_BOOKS, {
    variables: { genre: filter !== 'all' ? filter : null },
    fetchPolicy: 'cache-and-network',
  });

  const books = filteredBooksData?.allBooks;

  if (booksLoading || filteredBooksLoading) {
    return <div>loading...</div>;
  }

  if (booksError || filteredBooksError) {
    return <div>Error: Could not load books</div>;
  }

  return (
    <div>
      <h2>Books</h2>
      <div>show:</div>
      <select value={filter} onChange={({ target }) => setFilter(target.value)}>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <BookTable books={books} />
    </div>
  );
};

export default Books;