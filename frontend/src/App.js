import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import ViewBlog from './pages/ViewBlog';
import Navbar from './components/Navbar';
import './styles/styles.css';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/view/:id" element={<ViewBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
