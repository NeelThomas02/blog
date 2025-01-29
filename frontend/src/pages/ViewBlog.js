import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewBlog = () => {
  const { id } = useParams();  // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);  // State to hold the blog data
  const [loading, setLoading] = useState(true);  // State to manage loading state

  useEffect(() => {
    // Fetch blog data when the component mounts or when the ID changes
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(response => {
        setBlog(response.data);  // Set the blog data
        setLoading(false);  // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
        setLoading(false);  // Set loading to false if an error occurs
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;  // Display loading text while fetching data
  }

  if (!blog) {
    return <p>Blog not found.</p>;  // Display if blog is not found
  }

  return (
    <div className="view-blog">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
    </div>
  );
};

export default ViewBlog;
