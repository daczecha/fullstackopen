import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import BlogForm from './BlogForm';
import BlogPost from './BlogPost';
import Togglable from './Toggleable';

const Blogs = ({
  user,
  setError,
  setErrorMessage,
  setSuccess,
  setSuccessMessage,
}) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios.get('http://localhost:3003/api/blogs');
      setBlogs(response.data);
    })();
  }, []);

  const toggleRef = useRef();

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

  const renderedBlogs = sortedBlogs.map((elem) => (
    <BlogPost
      key={elem.id}
      setBlogs={setBlogs}
      blogs={blogs}
      user={user}
      data={elem}
    />
  ));

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={toggleRef}>
        <BlogForm
          user={user}
          setBlogs={setBlogs}
          setError={setError}
          setErrorMessage={setErrorMessage}
          setSuccess={setSuccess}
          setSuccessMessage={setSuccessMessage}
          blogs={blogs}
          toggleRef={toggleRef}
        ></BlogForm>
      </Togglable>
      <div>{renderedBlogs}</div>
    </div>
  );
};

export default Blogs;
