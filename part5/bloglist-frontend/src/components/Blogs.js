import React, { useRef } from 'react';
import BlogForm from './BlogForm';
import BlogPost from './BlogPost';
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
  const toggleRef = useRef();

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

  const renderedBlogs = sortedBlogs.map((elem) => (
    <BlogPost key={elem.id} data={elem} />
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
