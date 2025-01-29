import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure the path to App.js is correct
import './styles/styles.css'; // Import your CSS if needed

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
