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

export const showNotificationWithTimeout = (dispatch, message) => {
  clearTimeout(timeoutID);
  timeoutID = setTimeout(() => {
    dispatch(hideNotification());
  }, 5000);

  return {
    type: 'SHOW_NOTIFICATION',
    payload: message
  };
};

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' };
};

export default reducer;