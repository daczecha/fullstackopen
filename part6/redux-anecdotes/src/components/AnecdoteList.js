import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const { anecdotes } = useSelector((state) => state);

  const dispatch = useDispatch();

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setNotification(`you voted '${anecdote.content}'`));
  };

  return (
    <div className="anecdote--list">
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
