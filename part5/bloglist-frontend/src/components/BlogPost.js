import React, { useState } from 'react';

const BlogPost = ({ data }) => {
  const [details, setDetails] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('view');
  const showDetails = { display: details ? '' : 'none' };

  const toggleDetails = () => {
    setDetails(!details);
    setButtonLabel(details ? 'view' : 'hide');
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
          likes {data.likes}
          <button>like</button>
        </p>
        <p>{data.user.name}</p>
      </div>
    </div>
  );
};

export default BlogPost;
