const express = require('express');
const { calculateRoute, storeData, getData } = require('../controllers/routeController');

const router = express.Router();

router.post('/calculate-route', calculateRoute);
router.post('/store-data', storeData);
router.get('/get-data', getData);

module.exports = router;