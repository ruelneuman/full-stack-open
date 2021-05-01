import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/authenticationReducer';

const UserInfo = () => {
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.authentication);

  const handleLogout = () => {
    dispatch(logOut());
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <span>{user.name} is logged in</span>
      <button type="button" onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default UserInfo;