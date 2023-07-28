// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB (replace 'your_db_connection_string' with your actual MongoDB connection string)
mongoose.connect('your_db_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a mongoose schema for the counter data
const counterSchema = new mongoose.Schema({
  value: { type: Number, default: 0 }
});

// Create a mongoose model for the counter
const Counter = mongoose.model('Counter', counterSchema);

// Middleware to parse JSON data in the request body
app.use(bodyParser.json());

// API endpoint to get the current counter value
app.get('/api/counter', async (req, res) => {
  try {
    const counter = await Counter.findOne();
    res.json({ value: counter ? counter.value : 0 });
  } catch (error) {
    console.error('Error fetching counter value:', error);
    res.status(500).json({ error: 'Error fetching counter value' });
  }
});

// API endpoint to increment the counter
app.post('/api/increment', async (req, res) => {
  try {
    const counter = await Counter.findOne();
    if (counter) {
      counter.value += 1;
      await counter.save();
    } else {
      await Counter.create({ value: 1 });
    }
    res.json({ value: counter ? counter.value : 1 });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    res.status(500).json({ error: 'Error incrementing counter' });
  }
});

// API endpoint to decrement the counter
app.post('/api/decrement', async (req, res) => {
  try {
    const counter = await Counter.findOne();
    if (counter && counter.value > 0) {
      counter.value -= 1;
      await counter.save();
    }
    res.json({ value: counter ? counter.value : 0 });
  } catch (error) {
    console.error('Error decrementing counter:', error);
    res.status(500).json({ error: 'Error decrementing counter' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
