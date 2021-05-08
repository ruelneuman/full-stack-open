import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/authenticationReducer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

const LoginForm = () => {
  const classes = useStyles();

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
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;