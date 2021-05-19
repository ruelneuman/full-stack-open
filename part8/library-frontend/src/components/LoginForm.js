import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOG_IN } from '../queries';

const LoginForm = ({ setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOG_IN, {
    onError: (error) => {
      console.error(error);
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      window.localStorage.setItem('library-user-token', token);
      setPage('authors');
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({
      variables: {
        username,
        password,
      }
    });

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;