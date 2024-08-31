const express = require('express');
const cors = require('cors');
const route = require('./routes/route');

const app = express();

// Adiciona o middleware CORS sem opções para liberar todas as origens
app.use(cors());

app.use(express.json());

// Usa as rotas definidas no arquivo route.js
app.use('/', route);

module.exports = app;
