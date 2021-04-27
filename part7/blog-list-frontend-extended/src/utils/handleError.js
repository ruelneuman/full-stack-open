const handleError = (error) => {
  if (error.response) {
    console.error(error.response);

    return error.response.data.error
      ? error.response.data.error
      : error.message;
  } else if (error.request) {
    console.error(error.request);
    return error.message;
  } else {
    console.log('Error', error.message);
    return error.message;
  }
};

export default handleError;