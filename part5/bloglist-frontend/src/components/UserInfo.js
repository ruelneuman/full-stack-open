import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ user, handleLogout }) => (
  <div>
    <span>{user.name} is logged in</span>
    <button type="button" onClick={handleLogout}>Log out</button>
  </div>
);

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default UserInfo;