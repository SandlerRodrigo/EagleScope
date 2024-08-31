const express = require('express');
const route = require('./routes/route');

const app = express();
app.use(express.json());

// Set up routes
app.use('/calculate-route', route);

module.exports = app;