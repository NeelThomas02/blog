import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Blog = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>
      <button onClick={handleLogout}>Logout</button>
      <p>Your blog content goes here...</p>
    </div>
  );
};

export default Blog;
