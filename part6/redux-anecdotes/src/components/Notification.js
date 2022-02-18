import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const { notification } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification) return <div style={style}>{notification}</div>;
  return null;
};

export default Notification;
