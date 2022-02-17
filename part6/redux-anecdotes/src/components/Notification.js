import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const { notification } = useSelector((state) => state);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(removeNotification());
  }, 5000);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification) return <div style={style}>{notification}</div>;
  return null;
};

export default Notification;
