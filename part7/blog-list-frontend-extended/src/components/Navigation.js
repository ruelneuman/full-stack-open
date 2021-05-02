import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/authenticationReducer';

const Navigation = () => {
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.authentication);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <Link to="/blogs">Blogs</Link>
      <Link to="/users">Users</Link>
      {!isLoggedIn
        ? <Link to="/login">Login</Link>
        :(<>
          <span>{user.name} is logged in</span>
          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        </>)}
    </div>
  );
};

export default Navigation;