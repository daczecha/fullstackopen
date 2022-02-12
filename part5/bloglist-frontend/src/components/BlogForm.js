import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = ({
  setSuccessMessage,
  setSuccess,
  setBlogs,
  blogs,
  setError,
  setErrorMessage,
  user,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3003/api/blogs',
        {
          title,
          author,
          url,
        },
        { headers: { authorization: 'Bearer ' + user.token } }
      );

      setBlogs([...blogs, response.data]);
      setSuccessMessage(`successfully added ${title} by ${author}`);
      setSuccess(true);

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
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

  return (
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
  );
};

export default BlogForm;
