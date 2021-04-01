import React, { useState } from 'react';
import loginService from '../services/login';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      })

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <h2>Log in to Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;