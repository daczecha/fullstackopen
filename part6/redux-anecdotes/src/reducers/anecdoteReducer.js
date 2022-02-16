const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (content) => {
  return {
    content,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const anecdoteIndex = state.findIndex(
        (anecdote) => anecdote.id === action.payload.id
      );
      const modifiedState = state;
      modifiedState[anecdoteIndex].votes++;
      return modifiedState;
    case 'CREATE_ANECDOTE':
      return [...state, action.payload];
    default:
      return state;
  }
};

//action creators
const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    payload: { id },
  };
};

const createAnecdote = (content) => {
  return {
    type: 'CREATE_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export { reducer, voteAnecdote, createAnecdote };