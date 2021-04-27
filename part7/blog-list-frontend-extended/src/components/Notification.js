import React from 'react';
import '../index.css';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  const className = `notification notification--${notification.type}`;

  return (
    <div className={className}>{notification.message}</div>
  );
};

export default Notification;