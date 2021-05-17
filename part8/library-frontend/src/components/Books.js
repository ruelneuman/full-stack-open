import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import BookTable from './BookTable';

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const { data, loading, error } = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState('all');

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: Could not load books</div>;
  }

  const books = data.allBooks.filter((book) => {
    if (filter === 'all') return true;

    return book.genres.includes(filter);
  });

  const genres = [...(new Set(data.allBooks.flatMap((book) => book.genres)))];
  const options = ['all'].concat(genres);

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