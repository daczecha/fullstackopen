import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const filterAnecdotes = (e) => {
    const delay = setTimeout(() => {
      dispatch(setFilter(e.target.value));
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

export default Filter;
