import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const className = `notification notification--${notification.type}`;

  return (
    <div className={className}>{notification.message}</div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'success',
      'failure',
    ]).isRequired,
  }),
};

export default Notification;