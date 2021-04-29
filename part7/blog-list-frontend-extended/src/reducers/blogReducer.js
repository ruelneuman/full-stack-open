import blogService from '../services/blogs';
import { showNotificationWithTimeout } from './notificationReducer';
import handleError from '../utils/handleError';

const initialState = {
  blogs: [],
  status: 'idle'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS_PENDING': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'INIT_BLOGS_SUCCESS': {
      return {
        blogs: action.payload,
        status: 'succeeded',
      };
    }
    case 'INIT_BLOGS_ERROR': {
      return {
        ...state,
        status: 'failed',
      };
    }
    case 'NEW_BLOG': {
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    }
    case 'DELETE_BLOG':
      return state; // to implement
    case 'LIKE_BLOG':
      return state; // to implement
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    dispatch({ type: 'INIT_BLOGS_PENDING' });

    try {
      const blogs = await blogService.getAll();

      dispatch({
        type: 'INIT_BLOGS_SUCCESS',
        payload: blogs,
      });
    } catch (error) {
      console.error(error);

      dispatch({ type: 'INIT_BLOGS_ERROR' });
    }
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogService.create(blog);

      dispatch({
        type: 'NEW_BLOG',
        payload: addedBlog,
      });

      const message = `'${addedBlog.title}' by ${addedBlog.author} was added`;
      dispatch(showNotificationWithTimeout(message, 'success'));
    } catch (error) {
      const message = `Add blog unsuccessful: ${handleError(error)}`;
      dispatch(showNotificationWithTimeout(message, 'failure'));
    }
  };
};

export default reducer;