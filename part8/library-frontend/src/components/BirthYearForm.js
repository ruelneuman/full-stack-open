import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR } from '../queries';

const BirthYearForm = () => {
  const [name, setName] = useState('');
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
    setName('');
  };

  return (
    <div>
      <h3>set birth year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
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