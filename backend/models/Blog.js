const mongoose = require('mongoose');

// Define the schema for the blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Create the model based on the schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
