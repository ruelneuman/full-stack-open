import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import UserList from './components/UserList';
import User from './components/User';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import { Switch, Route, Redirect } from 'react-router-dom';


const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.user); user;

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  return (
    <CssBaseline>
      <Navigation />

      <Container>
        <Notification />

        <Switch>
          <UnauthenticatedRoute path="/login" component={LoginForm} />
          <Route exact path="/blogs/:id" component={Blog} />
          <Route path="/blogs" component={BlogList} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/users" component={UserList} />
          <Route>
            <Redirect to="/blogs" />
          </Route>
        </Switch>
      </Container>

    </CssBaseline>
  );
};

export default App;