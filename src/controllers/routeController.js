const { findBestRoute } = require('../services/routeService');

exports.calculateRoute = (req, res) => {
  const coordinates = req.body.coordinates;
  
  if (!coordinates || !Array.isArray(coordinates)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  const { bestRoute, minDistance } = findBestRoute(coordinates);

  res.json({
    best_route: bestRoute,
    min_distance: minDistance
  });
};