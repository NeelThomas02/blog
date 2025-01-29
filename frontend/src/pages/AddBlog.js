import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddBlog.css';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setMessage('Title and content are required');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/blogs', { title, content });
      setMessage('Blog added successfully');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding blog:', error);
      setMessage('Error adding blog');
    }
  };

  return (
    <div className="add-blog-container">
      <h1>Add New Blog</h1>
      <form onSubmit={handleSubmit} className="add-blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here"
          />
        </div>
        {message && <p className="message">{message}</p>}
        <button type="submit" className="submit-btn">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
