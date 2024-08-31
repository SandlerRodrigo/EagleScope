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

let storedData = [
  {
    coordinate: "-30.034647, -51.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725100076.jpeg"
  },
    {
    coordinate: "-34.034647, -51.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725099566.png"
  },
    {
    coordinate: "-30.034647, -56.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725100071.jpeg"
  },
    {
    coordinate: "-32.034647, -21.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725099920.jpeg"
  },
    {
    coordinate: "-10.034647, -21.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725099915.jpeg"
  },
    {
    coordinate: "-10.034647, -91.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725099814.png"
  },
];

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