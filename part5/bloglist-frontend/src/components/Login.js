import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/api/login', {
        username,
        password,
      });
      setUser(response.data);
      setUserName('');
      setPassword('');
    } catch (exception) {
      throw Error(exception);
    }
  };

  return (
    <div>
      <div>log in to application</div>
      <form onSubmit={loginHandler}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          onChange={({ target }) => setUserName(target.value)}
          value={username}
        ></input>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        ></input>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
