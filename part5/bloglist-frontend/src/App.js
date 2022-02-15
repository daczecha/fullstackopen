import React, { useState } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('user'))
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div>
      <h1>blogs</h1>
      <button
        onClick={() => {
          window.localStorage.removeItem('user');
          setUser(null);
        }}
      >
        logout
      </button>

      {success ? <div className="success">{successMessage}</div> : null}
      {error ? <div className="error">{errorMessage}</div> : null}
      {user ? <p>{user.name} logged in</p> : null}
      {user ? (
        <Blogs
          user={user}
          setUser={setUser}
          setError={setError}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setSuccess={setSuccess}
        />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
