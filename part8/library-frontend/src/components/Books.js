import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import BookTable from './BookTable';

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const [filter, setFilter] = useState('all');
  const options = useRef(null);

  const optionsResults = useQuery(ALL_BOOKS);

  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: { genre: filter !== 'all' ? filter : null }
  });

  useEffect(() => {
    if (optionsResults?.data?.allBooks) {
      const genres = [...(new Set(optionsResults.data.allBooks.flatMap((book) => book.genres)))];
      options.current = ['all'].concat(genres);
    }
  }, [optionsResults]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: Could not load books</div>;
  }

  const books = data.allBooks;

  return (
    <div>
      <h2>Books</h2>
      <div>show:</div>
      <select value={filter} onChange={({ target }) => setFilter(target.value)}>
        {options.current.map((option) => {
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