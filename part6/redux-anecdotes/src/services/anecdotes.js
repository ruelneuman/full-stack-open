import axios from 'axios';

const baseUrl = '/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const update = async (id, newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote);
  return response.data;
};

export default {
  getAll,
  createNew,
  update,
};