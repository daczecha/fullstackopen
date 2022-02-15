import axios from 'axios';
import React, { useState } from 'react';

const BlogPost = ({ data, user, blogs, setBlogs }) => {
  const [details, setDetails] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('view');
  const showDetails = { display: details ? '' : 'none' };
  const [likes, setLikes] = useState(data.likes);

  const toggleDetails = () => {
    setDetails(!details);
    setButtonLabel(details ? 'view' : 'hide');
  };

  const likeBlogPost = async () => {
    const requestBody = {
      ...data,
      likes: data.likes + 1,
      user: data.user.id,
    };
    await axios.put(`http://localhost:3003/api/blogs/${data.id}`, requestBody);
    setLikes(likes + 1);
  };

  const removeBlogPost = async () => {
    if (window.confirm(`Remove ${data.title} by ${data.author}?`)) {
      await axios.delete(`http://localhost:3003/api/blogs/${data.id}`, {
        headers: { authorization: 'Bearer ' + user.token },
      });
      const filteredBlogs = blogs.filter((elem) => elem.id !== data.id);
      setBlogs(filteredBlogs);
    }
  };

  return (
    <div className="blog">
      <p>
        {data.title} by {data.author}
        <button onClick={toggleDetails}>{buttonLabel}</button>
      </p>
      <div style={showDetails}>
        <a href={data.url}>{data.url}</a>
        <p>
          likes {likes}
          <button onClick={likeBlogPost}>like</button>
        </p>
        <p>{data.user.name}</p>
        {user.username === data.user.username ? (
          <button onClick={removeBlogPost}>remove</button>
        ) : null}
      </div>
    </div>
  );
};

export default BlogPost;
