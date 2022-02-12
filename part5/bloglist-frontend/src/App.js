import React, { useState } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>{user ? <Blogs user={user} /> : <Login setUser={setUser} />}</div>
  );
};

export default App;
