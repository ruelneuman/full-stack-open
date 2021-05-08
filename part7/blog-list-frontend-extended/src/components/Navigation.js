import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/authenticationReducer';

const Navigation = () => {

  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.authentication);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <AppBar position="static">
      <ToolBar>
        <Button color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        {isLoggedIn
          ? (<Button color="inherit" onClick={handleLogout}>
            Log out
          </Button>)
          : (<Button color="inherit" component={Link} to="/login">
            Login
          </Button>)}
        {isLoggedIn ? <div style={{ marginLeft: 'auto' }}>{user.name} is logged in</div> : null}
      </ToolBar>
    </AppBar>
  );
};

export default Navigation;