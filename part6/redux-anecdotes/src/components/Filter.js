import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';
const Filter = ({ setFilter }) => {
  const filterAnecdotes = (e) => {
    const delay = setTimeout(() => {
      setFilter(e.target.value);
    }, 800);

    return () => {
      clearTimeout(delay);
    };
  };

  return (
    <div>
      filter <input type="text" onChange={filterAnecdotes}></input>
      <hr></hr>
    </div>
  );
};
const mapDispatchToProps = {
  setFilter,
};

export default connect(null, mapDispatchToProps)(Filter);
