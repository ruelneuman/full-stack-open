import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map((anecdote) => {
        return anecdote.id !== action.payload.id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 };
      });
    case 'NEW_ANECDOTE':
      return [...state, action.payload];
    case 'INIT_ANECDOTES':
      return action.payload;
    default:
      return state;
  }
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  };
};

export const addAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: anecdote
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      payload: anecdotes
    });
  };
};

export default reducer;