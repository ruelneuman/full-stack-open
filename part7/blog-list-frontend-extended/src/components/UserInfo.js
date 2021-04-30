import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/authenticationReducer';

const UserInfo = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.user);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <span>{user.name} is logged in</span>
      <button type="button" onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default UserInfo;