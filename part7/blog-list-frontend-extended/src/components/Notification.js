import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  alert: {
    margin: theme.spacing(1),
  },
}));

const Notification = () => {
  const classes = useStyles();

  const notification = useSelector((state) => state.notification);

  if (!notification || !notification.message) {
    return null;
  }

  return (
    <Alert className={classes.alert} severity={notification.type}>{notification.message}</Alert>
  );
};

export default Notification;