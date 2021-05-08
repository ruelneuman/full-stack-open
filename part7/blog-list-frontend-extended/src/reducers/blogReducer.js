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
    case 'DELETE_BLOG': {
      const id = action.payload.id;
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== id)
      };
    }
    case 'UPDATE_BLOG': {
      const { id, updatedBlog } = action.payload;
      const blogs = state.blogs.map((blog) => (blog.id !== id ? blog : updatedBlog));

      return {
        ...state,
        blogs
      };
    }
    case 'NEW_COMMENT': {
      const { id, comment } = action.payload;

      const blogToUpdate = state.blogs.find((blog) => blog.id === id);

      const updatedBlog = {
        ...blogToUpdate,
        comments: [...blogToUpdate.comments, comment]
      };

      const updatedblogs = state.blogs.map((blog) => blog.id !== id ? blog : updatedBlog);

      return { ...state, blogs: updatedblogs };
    }
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
      handleError(error);

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
      dispatch(showNotificationWithTimeout(message, 'error'));
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);

      dispatch({
        type: 'DELETE_BLOG',
        payload: { id },
      });

      dispatch(showNotificationWithTimeout('Blog removed', 'success'));
    } catch (error) {
      const message = `Unable to remove blog: ${handleError(error)}`;
      dispatch(showNotificationWithTimeout(message, 'error'));
    }
  };
};

export const likeBlog = (id) => {

  return async (dispatch, getState) => {
    const state = getState();
    const blogs = state.blogs.blogs;
    const blogToLike = blogs.find((blog) => blog.id === id);
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };

    try {
      const response = await blogService.update(id, likedBlog);

      dispatch({
        type: 'UPDATE_BLOG',
        payload: { id, updatedBlog: likedBlog },
      });

      const message = `Liked ${response.title} by ${response.author}`;
      dispatch(showNotificationWithTimeout(message, 'success'));
    } catch (error) {
      const message = `Unable to like: ${handleError(error)}`;
      dispatch(showNotificationWithTimeout(message, 'error'));
    }
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      await blogService.comment(id, comment);

      dispatch({
        type: 'NEW_COMMENT',
        payload: { id, comment },
      });

      const message = 'Posted comment';
      dispatch(showNotificationWithTimeout(message, 'success'));
    } catch (error) {
      const message = `Unable to comment: ${handleError(error)}`;
      dispatch(showNotificationWithTimeout(message, 'error'));
    }
  };
};

export default reducer;