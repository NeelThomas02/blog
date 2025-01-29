import React from 'react';
import { Link } from 'react-router-dom';

function BlogItem({ blog }) {
  return (
    <div className="blog-item">
      <h3>{blog.title}</h3>
      <p>{blog.content.substring(0, 100)}...</p>
      <Link to={`/view/${blog._id}`}>Read More</Link>
      <Link to={`/edit/${blog._id}`}>Edit</Link>
    </div>
  );
}

export default BlogItem;
 
