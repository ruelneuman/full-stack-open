const initialState = {
  message: null,
  type: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      const { message, type } = action.payload;
      return {
        message,
        type
      };
    }
    case 'HIDE_NOTIFICATION':
      return {
        message: null,
        type: null
      };
    default:
      return state;
  }
};

let timeoutID = null;

export const showNotificationWithTimeout = (message, type, seconds = 3) => {
  return async (dispatch) => {
    dispatch(showNotification(message, type));

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      dispatch(hideNotification());
    }, seconds * 1000);
  };
};

export const showNotification = (message, type) => {
  return {
    type: 'SHOW_NOTIFICATION',
    payload: {
      message,
      type
    }
  };
};

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' };
};

export default reducer;