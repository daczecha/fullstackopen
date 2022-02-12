import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState(undefined);
  const [author, setAuthor] = useState(undefined);
  const [url, setUrl] = useState(undefined);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getBlogs = async () => {
    const response = await axios.get('http://localhost:3003/api/blogs');
    setBlogs(response.data);
  };

  useEffect(() => getBlogs(), []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        'http://localhost:3003/api/blogs',
        {
          title,
          author,
          url,
        },
        { headers: { authorization: 'Bearer ' + user.token } }
      );
      setSuccess(true);
      setSuccessMessage(`successfully added ${title} by ${author}`);
      setError(false);

      setTitle('');
      setAuthor('');
      setUrl('');

      getBlogs();
    } catch (exception) {
      setSuccess(false);
      setError(true);
      setErrorMessage('bad request');
    }

    setTimeout(() => {
      setError(false);
      setSuccess(false);
      setSuccessMessage('');
      setErrorMessage('');
    }, 2000);
  };

  const renderedBlogs = blogs.map((blog) => (
    <p key={blog.id}>
      {blog.title} {blog.author}
    </p>
  ));

  return (
    <div>
      <h1>blogs</h1>
      {success ? <div className="success">{successMessage}</div> : null}
      {error ? <div className="error">{errorMessage}</div> : null}

      <p>{user.name} logged in</p>
      <button
        onClick={() => {
          window.localStorage.removeItem('user');
          setUser(null);
        }}
      >
        logout
      </button>

      <div>
        <h1>create new</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">title</label>
          <input
            type="text"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          ></input>
          <br />
          <label htmlFor="author">author</label>
          <input
            type="text"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          ></input>
          <br />

          <label htmlFor="url">url</label>
          <input
            type="text"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            value={url}
          ></input>
          <br />
          <button type="submit">create</button>
        </form>
      </div>

      <div>{renderedBlogs}</div>
    </div>
  );
};

export default Blogs;
