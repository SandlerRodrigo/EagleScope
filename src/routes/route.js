const express = require('express');
const { calculateRoute } = require('../controllers/routeController');

const router = express.Router();

router.post('/', calculateRoute);

module.exports = router;