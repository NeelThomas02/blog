const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');  // Make sure the path is correct

// Route to get all blogs
router.get('/blogs', async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await Blog.find();  
    res.json(blogs);  // Send the blogs as a JSON response
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// Route to add a new blog
router.post('/blogs', async (req, res) => {
  const { title, content } = req.body;  // Extract data from the request body

  // Check if both title and content are provided
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    // Create a new blog entry
    const newBlog = new Blog({
      title,
      content,
    });

    // Save the blog to the database
    await newBlog.save();

    // Respond with the newly added blog
    res.status(201).json({
      message: 'Blog added successfully!',
      blog: newBlog,
    });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ message: 'Error adding blog' });
  }
});

// Route to update a blog by its ID
router.put('/blogs/:id', async (req, res) => {
  const { id } = req.params;  // Get the blog ID from the URL parameters
  const { title, content } = req.body;  // Get the updated data from the request body

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    // Find the blog by ID and update it
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }  // This ensures the updated document is returned
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Respond with the updated blog
    res.status(200).json({
      message: 'Blog updated successfully!',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating blog' });
  }
});

// Route to delete a blog by its ID
router.delete('/blogs/:id', async (req, res) => {
  const { id } = req.params;  // Get the blog ID from the URL parameters

  try {
    // Find and delete the blog by ID
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Respond with a success message
    res.status(200).json({
      message: 'Blog deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog' });
  }
});

module.exports = router;
