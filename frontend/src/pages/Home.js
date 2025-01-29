import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // For navigation to the edit page
import EditModal from '../components/EditModal';  // Import the modal
import '../styles/styles.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  return (
    <div className="home">
      <h1>Blog Posts</h1>
      {blogs.length > 0 ? (
        blogs.map(blog => (
          <div key={blog._id} className="blog-card">
            <h3>{blog.title} <button onClick={() => openModal(blog)} className="edit-btn">✏️</button> <Link to={`/view/${blog._id}`} className="view-btn">👁️</Link> </h3>
            <p>{blog.content}</p>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}

      {showModal && selectedBlog && (
        <EditModal
          blog={selectedBlog}
          onClose={closeModal}
          onSave={(updatedBlog) => {
            setBlogs(prevBlogs => 
              prevBlogs.map(b => b._id === updatedBlog._id ? updatedBlog : b)
            );
            closeModal();
          }}  // Ensure the updated blog gets saved and reflected in the state
        />
      )}
    </div>
  );
};

export default Home;
