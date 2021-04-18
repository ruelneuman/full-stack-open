import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  if (!notification) return null;

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { notification: state.notification };
};

export default connect(mapStateToProps)(Notification);