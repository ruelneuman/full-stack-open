import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import BirthYearForm from './BirthYearForm';

const Authors = ({ token }) => {
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
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors.map((author) =>
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {token && <BirthYearForm authors={authors} token={token} />}
    </div>
  );
};

export default Authors;
