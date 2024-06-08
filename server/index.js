const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./models/Users');

console.log('PORT:', process.env.PORT);  // Verify the port
console.log('MONGO_URI:', process.env.MONGO_URI);  // Verify the MongoDB URI

const app = express();
app.use(express.json());

// Route to add a new user
app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding new user:", error);
    res.status(500).json({ error: 'Could not create user' });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });