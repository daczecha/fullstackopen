import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { inintializeAnecdotes } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inintializeAnecdotes());
  }, [dispatch]);

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
