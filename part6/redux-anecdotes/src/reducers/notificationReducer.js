const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'REMOVE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: notification
  };
};

export const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' };
};

export default reducer;