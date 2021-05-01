import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  return (
    <Route {...rest} render={(props) => (
      isLoggedIn ?
        <Redirect to="/blogs" />
        : <Component {...props} />
    )} />
  );
};

export default UnauthenticatedRoute;