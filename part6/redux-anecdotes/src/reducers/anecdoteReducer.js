import { createSlice } from '@reduxjs/toolkit';
import anecdoteServices from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const anecdoteIndex = state.findIndex(
        (anecdote) => anecdote.id === action.payload
      );
      state[anecdoteIndex].votes++;
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const inintializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (body) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNew(body);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
