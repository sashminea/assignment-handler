const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const Assignment = require('./models/Assignments');

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Send 'index.html' when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('Could not connect to MongoDB: ', err));


// POST endpoint to create a new assignment
app.post('/api/assignments', async (req, res) => {
    try {
        // Destructure the request body to get the values
        const {
            name,
            price,
            cover,
            user,
            cardID,
            date,
            desc,
            pfp,
            tag
        } = req.body;

        // Create a new assignment using the schema
        const newAssignment = new Assignment({
            name,
            price,
            cover,
            user,
            cardID,
            date,
            desc,
            pfp,
            tag
        });

        // Save the new assignment to the database
        await newAssignment.save();

        // Send back the success response
        res.status(201).json({
            message: 'Assignment created successfully!',
            assignment: newAssignment
        });
    } catch (error) {
        // Handle any errors
        res.status(400).json({
            message: 'Error creating assignment',
            error
        });
    }
});


// GET endpoint to fetch all assignments
app.get('/api/assignments', async (req, res) => {
    try {
      const assignments = await Assignment.find();
      res.status(200).json(assignments);
    }
    catch(error) {
      res.status(500).json({
        message: 'Error retrieving assignments',
        error
      })
    }
});


// PUT endpoint to update an existing assignment
app.put('/api/assignments/:cardID', async (req, res) => {
  try {
    const { cardID } = req.params;
    const updatedData = req.body;

    const existingAsgn = await Assignment.findOne({ cardID });
    if (!existingAsgn) {
      return res.status(404).json({
        message: 'Assignment not found',
      });
    }

    const mergedData = {
      ...existingAsgn.toObject(),
      ...updatedData,
    };

    const updatedAssignment = await Assignment.findOneAndUpdate({ cardID }, mergedData, { new: true });

    res.status(200).json({
      message: 'Assignment updated successfully!',
      assignment: updatedAssignment,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating assignment',
      error,
    });
  }
});

// DELETE endpoint to delete an assignment by cardID
app.delete('/api/assignments/:cardID', async (req, res) => {
  try {
    const { cardID } = req.params;

    // Find and delete the assignment by cardID
    const deletedAssignment = await Assignment.findOneAndDelete({ cardID });

    if (!deletedAssignment) {
      return res.status(404).json({
        message: 'Assignment not found',
      });
    }

    res.status(200).json({
      message: 'Assignment deleted successfully!',
      assignment: deletedAssignment,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error deleting assignment',
      error,
    });
  }
});
