import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('user'))
  );

  const [blogs, setBlogs] = useState([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getBlogs = async () => {
    const response = await axios.get('http://localhost:3003/api/blogs');
    setBlogs(response.data);
  };

  useEffect(() => getBlogs(), []);

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
          blogs={blogs}
          setBlogs={setBlogs}
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
