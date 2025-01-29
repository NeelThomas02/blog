import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const EditModal = ({ blog, onClose, onSave }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  useEffect(() => {
    setTitle(blog.title);
    setContent(blog.content);
  }, [blog]);

  const handleSave = async () => {
    try {
      const updatedBlog = await axios.put(`http://localhost:5000/api/blogs/${blog._id}`, {
        title,
        content
      });
      onSave(updatedBlog.data.blog); // Pass the updated blog to the parent
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Blog</h3>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
        />
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Content"
        />
        <button onClick={handleSave} className='save-btn'>Save</button>
        <button onClick={onClose} className='save-btn'>Close</button>
      </div>
    </div>
  );
};

export default EditModal;
