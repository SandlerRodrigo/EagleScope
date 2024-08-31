const express = require('express');
const { calculateRoute, storeData } = require('../controllers/routeController');

const router = express.Router();

router.post('/calculate-route', calculateRoute);
router.post('/store-data', storeData);

module.exports = router;