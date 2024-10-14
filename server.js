const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const Assignment = require('./models/Assignments');
const User = require('./models/Users');

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

// Route to handle saving user data
app.put('/api/users', async (req, res) => {
    const { username } = req.params;
    const updatedData = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ loggedIn: true }, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User data updated successfully!', updatedUser });
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Failed to update user data' });
    }
});

// GET route to retrieve logged-in user data
app.get('/api/users/loggedin', async (req, res) => {
    try {
        const loggedInUser = await User.findOne({ loggedIn: true });

        if (!loggedInUser) {
            return res.status(404).json({ message: 'No logged-in user found' });
        }

        res.status(200).json(loggedInUser);
    } catch (error) {
        console.error('Error retrieving logged-in user data:', error);
        res.status(500).json({ message: 'Failed to retrieve user data' });
    }
});

// POST route to insert a default user if the database is empty
app.post('/api/users', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        console.log('User count:', userCount);

        if (userCount === 0) {
            const defaultUser = {
                name: "Default",
                about: "I am so cool",
                username: "username",
                loggedIn: true
            };

            const newUser = new User(defaultUser);
            await newUser.save();
            console.log('New user saved:', newUser);
            return res.status(201).json({ message: 'Default user created!', newUser });
        } else {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists in the database.' });
        }
    } catch (error) {
        console.error('Error inserting default user:', error);
        res.status(500).json({ message: 'Failed to insert default user' });
    }
});
