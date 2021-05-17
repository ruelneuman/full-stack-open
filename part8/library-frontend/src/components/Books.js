import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

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

  const books = data.allBooks;
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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .filter((book) => {
              if (filter === 'all') return true;

              return book.genres.includes(filter);
            })
            .map((book) =>
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;