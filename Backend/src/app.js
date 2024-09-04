const express = require('express');
const cors = require('cors');
const path = require('path'); // Add this

const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../Frontend/build')));

// Routes
const route = require('./routes/route');
app.use('/', route);

// Serve the frontend's index.html for any unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/build', 'index.html'));
});

module.exports = app;
