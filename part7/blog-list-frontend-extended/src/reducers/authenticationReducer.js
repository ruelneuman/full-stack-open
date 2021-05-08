import loginService from '../services/login';
import blogService from '../services/blogs';
import { showNotificationWithTimeout } from './notificationReducer';
import handleError from '../utils/handleError';

const createInitialState = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);

    return { user, isLoggedIn: true };
  }

  return { user: null, isLoggedIn: false };
};

const reducer = (state = createInitialState(), action) => {
  switch (action.type) {
    case 'LOG_IN': {
      const user = action.payload.user;
      return { user, isLoggedIn: true };
    }
    case 'LOG_OUT': {
      return { user: null, isLoggedIn: false };
    }
    default:
      return state;
  }
};

export const logIn = (user) => {
  return async (dispatch) => {
    try {
      const authorizedUser = await loginService.login(user);

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(authorizedUser)
      );

      blogService.setToken(authorizedUser.token);

      dispatch({
        type: 'LOG_IN',
        payload: { user: authorizedUser }
      });

      const message = 'Logged in';
      dispatch(showNotificationWithTimeout(message, 'success'));
    } catch (error) {
      const message = `Login unsuccessful: ${handleError(error)}`;
      dispatch(showNotificationWithTimeout(message, 'error'));
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser');
    blogService.setToken(null);

    dispatch({
      type: 'LOG_OUT'
    });

    const message = 'Logged out';
    dispatch(showNotificationWithTimeout(message, 'success'));
  };
};

export default reducer;