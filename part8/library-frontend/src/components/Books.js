import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const { data, loading, error } = useQuery(ALL_BOOKS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: Could not load books</div>;
  }

  const books = data.allBooks;

  return (
    <div>
      <h2>books</h2>

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
          {books.map((book) =>
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