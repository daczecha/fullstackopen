import { useDispatch } from 'react-redux';

import { useEffect } from 'react';
import anecdoteService from './services/anecdotes';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { set } from './reducers/anecdoteReducer';

function App() {
  const dispatch = useDispatch();

  useEffect(
    () => {
      anecdoteService.getAll().then((anecdotes) => dispatch(set(anecdotes)));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="app">
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
}

export default App;
