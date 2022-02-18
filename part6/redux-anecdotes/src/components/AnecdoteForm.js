import { useDispatch } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import anecdoteServices from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNew = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';

    const response = await anecdoteServices.createNew({ content, votes: 0 });
    dispatch(create(response));
    dispatch(setNotification(`you created '${content}'`));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
