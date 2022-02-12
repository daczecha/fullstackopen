import React from 'react';
import BlogForm from './BlogForm';
import Togglable from './Toggleable';

const Blogs = ({
  blogs,
  user,
  setBlogs,
  setError,
  setErrorMessage,
  setSuccess,
  setSuccessMessage,
}) => {
  const renderedBlogs = blogs.map((blog) => (
    <p key={blog.id}>
      {blog.title} {blog.author}
    </p>
  ));

  return (
    <div>
      <Togglable buttonLabel="create">
        <BlogForm
          user={user}
          setBlogs={setBlogs}
          setError={setError}
          setErrorMessage={setErrorMessage}
          setSuccess={setSuccess}
          setSuccessMessage={setSuccessMessage}
          blogs={blogs}
        ></BlogForm>
      </Togglable>
      <div>{renderedBlogs}</div>
    </div>
  );
};

export default Blogs;
