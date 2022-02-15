import axios from 'axios';
import React, { useState } from 'react';

const BlogPost = ({ data }) => {
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

  return (
    <div className="blog">
      <p>
        {data.title} {data.author}
        <button onClick={toggleDetails}>{buttonLabel}</button>
      </p>
      <div style={showDetails}>
        <a href={data.url}>{data.url}</a>
        <p>
          likes {likes}
          <button onClick={likeBlogPost}>like</button>
        </p>
        <p>{data.user.name}</p>
      </div>
    </div>
  );
};

export default BlogPost;
