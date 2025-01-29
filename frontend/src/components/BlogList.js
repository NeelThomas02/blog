import React from 'react';
import BlogItem from './BlogItem';

function BlogList({ blogs }) {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
 
