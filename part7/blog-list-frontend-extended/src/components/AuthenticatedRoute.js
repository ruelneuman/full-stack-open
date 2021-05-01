import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  return (
    <Route {...rest} render={(props) => (
      isLoggedIn ?
        <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
};

export default AuthenticatedRoute;