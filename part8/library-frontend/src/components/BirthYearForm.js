import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR } from '../queries';

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.error(error);
    }
  });

  const submit = async (event) => {
    event.preventDefault();

    const bornInt = Number.parseInt(born, 10);

    editAuthor({
      variables: {
        name,
        born: bornInt,
      }
    });

    setBorn('');
  };

  return (
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((author) => {
            return (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            );
          })}
        </select>
        <div>
          Born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;