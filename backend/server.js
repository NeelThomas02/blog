const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Import the routes
const authRoutes = require('./routes/auth'); // Adjust path as needed

// Middleware
app.use(express.json());
app.use(cors());

// Use the auth routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blog-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
