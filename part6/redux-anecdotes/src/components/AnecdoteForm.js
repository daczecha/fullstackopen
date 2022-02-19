import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { sendNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ createAnecdote, sendNotification }) => {
  const createNew = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';

    const body = {
      content,
      votes: 0,
    };

    createAnecdote(body);
    sendNotification(`you created '${content}'`, 3);
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

const mapDispatchToProps = {
  createAnecdote,
  sendNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
