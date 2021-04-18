const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload;
    case 'HIDE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

let timeoutID = null;

export const showNotificationWithTimeout = (message, seconds) => {
  return async (dispatch) => {
    dispatch(showNotification(message));

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      dispatch(hideNotification());
    }, seconds * 1000);
  };
};

export const showNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    payload: message
  };
};

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' };
};

export default reducer;