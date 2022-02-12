import React, { useState } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('user'))
  );

  return (
    <div>
      {user ? (
        <Blogs user={user} setUser={setUser} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
