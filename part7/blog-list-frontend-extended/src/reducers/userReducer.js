import userService from '../services/users';
import handleError from '../utils/handleError';

const initialState = {
  users: [],
  status: 'idle'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USERS_PENDING': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'INIT_USERS_SUCCESS': {
      return {
        users: action.payload,
        status: 'succeeded',
      };
    }
    case 'INIT_USERS_ERROR': {
      return {
        ...state,
        status: 'failed',
      };
    }
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    dispatch({ type: 'INIT_USERS_PENDING' });

    try {
      const users = await userService.getAll();

      dispatch({
        type: 'INIT_USERS_SUCCESS',
        payload: users,
      });
    } catch (error) {
      handleError(error);

      dispatch({ type: 'INIT_USERS_ERROR' });
    }
  };
};

export default reducer;