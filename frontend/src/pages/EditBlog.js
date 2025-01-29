import React, { useState } from 'react';
import axios from 'axios';

const EditBlog = ({ blogId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Function to handle the blog update
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare the data to send in the request body
    const updatedBlog = { title, content };

    try {
      // Make the PUT request to the backend
      const response = await axios.put(`http://localhost:5000/api/blogs/${blogId}`, updatedBlog);

      // Handle the successful response
      console.log(response.data);
      alert('Blog updated successfully!');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog');
    }
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            required
          />
        </div>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
