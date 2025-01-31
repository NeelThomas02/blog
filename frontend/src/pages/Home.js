import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import EditModal from '../components/EditModal';  // Import the modal
import AuthContext from '../context/AuthContext'; // Import AuthContext to check if the user is logged in
import Navbar from '../components/Navbar';  // Adjust path as needed
import '../styles/styles.css';

const Home = () => {
  const { user } = useContext(AuthContext);  // Access user from AuthContext
  const navigate = useNavigate();  // Use navigate for redirection
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (!user) {
      // If no user is logged in, redirect to login page
      navigate('/login');
    } else {
      // Fetch blogs if the user is logged in
      axios.get('http://localhost:5000/api/blogs')
        .then(response => {
          setBlogs(response.data);
        })
        .catch(error => console.error('Error fetching blogs:', error));
    }
  }, [user, navigate]);  // Re-run the effect if user changes

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
      <Navbar />
      <h1>Blog Posts</h1>
      {blogs.length > 0 ? (
        blogs.map(blog => (
          <div key={blog._id} className="blog-card">
            <h3>
              {blog.title} 
              <button onClick={() => openModal(blog)} className="edit-btn">✏️</button>
              <Link to={`/view/${blog._id}`} className="view-btn">👁️</Link>
            </h3>
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
          }} 
        />
      )}
    </div>
  );
};

export default Home;
