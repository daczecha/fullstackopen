import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const anecdoteIndex = state.findIndex(
        (anecdote) => anecdote.id === action.payload
      );
      state[anecdoteIndex].votes++;
    },
    create: (state, action) => {
      state.push(action.payload);
    },
    set: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { vote, create, set } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
