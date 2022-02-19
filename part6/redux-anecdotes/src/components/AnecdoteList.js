import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { sendNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({
  anecdotes,
  filter,
  voteAnecdote,
  sendNotification,
}) => {
  const anecdoteList = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const vote = (anecdote) => {
    voteAnecdote(anecdote);
    sendNotification(`you voted '${anecdote.content}'`, 3);
  };

  return (
    <div className="anecdote--list">
      {anecdoteList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  sendNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
