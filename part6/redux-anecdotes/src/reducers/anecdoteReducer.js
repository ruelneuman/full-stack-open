const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

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

export const addAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: asObject(content)
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    payload: anecdotes
  };
};

export default reducer;