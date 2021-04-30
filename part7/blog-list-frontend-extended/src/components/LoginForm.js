import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/authenticationReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = { username, password };
    dispatch(logIn(user));

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h1>Log in to Application</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            value={username}
            name="username-input"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            value={password}
            name="password-input"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;