const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();  // To load the environment variables
const blogRoutes = require('./routes/blogRoutes');  // Update path as needed

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  // Exit the process if DB connection fails
  });

// Routes
app.use('/api', blogRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
