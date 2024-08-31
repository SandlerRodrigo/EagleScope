const { findBestRoute } = require('../services/routeService');

exports.calculateRoute = (req, res) => {
  const coordinates = []

  if(!req.body){
    return res.status(400).json({error: 'Empty request'});
  }
  
  req.body.forEach(coordinate => {
    coordinates.push([coordinate["lat"], coordinate["lng"]]);
  });
  
  if (!Array.isArray(coordinates)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  const { bestRoute, minDistance } = findBestRoute(coordinates);

  res.json({
    best_route: bestRoute,
    min_distance: minDistance
  });
};

let storedData = [];

exports.storeData = (req, res) => {
  const coordinate = req.body.coordinate;
  const image = req.body.image;

  if (!coordinate || !image) {
    return res.status(400).json({ error: 'Both image and coordinate must be present' });
  }

  storedData.push({
    coordinate: coordinate,
    image: image
  });

  res.json({
    data: storedData
  });
};

exports.getData = (req, res) => {
  res.json({
    data: storedData
  })
}