// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rulesRouter = require('./routes/route'); // Import routes

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://userabc:userabc@cluster0.rwdzkix.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/rules', rulesRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
