import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const response = await axios.get('http://localhost:3003/api/blogs');
    setBlogs(response.data);
  };

  useEffect(() => getBlogs(), []);

  const renderedBlogs = blogs.map((blog) => (
    <p key={blog.id}>
      {blog.title} {blog.author}
    </p>
  ));

  return (
    <div>
      <h1>blogs</h1>
      <p>{user.name} logged in</p>

      <div>{renderedBlogs}</div>
    </div>
  );
};

export default Blogs;
