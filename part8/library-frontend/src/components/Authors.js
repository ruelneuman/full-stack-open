import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import BirthYearForm from './BirthYearForm';

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const { data, loading, error } = useQuery(ALL_AUTHORS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: Could not load authors</div>;
  }

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map((author) =>
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <BirthYearForm />
    </div>
  );
};

export default Authors;
