// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Connect to database
const loanRoutes = require('./routes/loans'); // ✅ load routes after express
const paymentRoutes = require('./routes/payments'); // Add this

// Create Express app
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1', loanRoutes);
app.use('/api/v1', paymentRoutes); // Add this under other routes

// Test route
app.get('/', (req, res) => {
  res.send('Bank Lending API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
