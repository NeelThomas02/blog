import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import ViewBlog from './pages/ViewBlog';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider

const App = () => {
  return (
    // Wrap your app with Router and AuthProvider
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/view/:id" element={<ViewBlog />} />
          {/* Add other routes as needed */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
