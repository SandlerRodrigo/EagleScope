const express = require('express');
const route = require('./routes/route');

const app = express();
app.use(express.json());

// Use as rotas definidas no arquivo route.js
app.use('/', route);

module.exports = app;