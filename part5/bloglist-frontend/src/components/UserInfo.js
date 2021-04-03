import React from 'react';

const UserInfo = ({ user, handleLogout }) => (
  <div>
    <span>{user.name} is logged in</span>
    <button type="button" onClick={handleLogout}>Log out</button>
  </div>
);

export default UserInfo;