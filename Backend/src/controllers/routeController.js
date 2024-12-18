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
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725111618.jpeg",
    bairro: "Sarandi",
    time: "05:32"
  },
    {
    coordinate: "-34.034647, -51.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725099566.png",
    bairro: "Farrapos",
    time: "02:32"
  },
    {
    coordinate: "-30.034647, -56.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725124508.jpeg",
    bairro: "Cidade Baixa",
    time: "03:32"
  },
  {
    coordinate: "-10.034647, -91.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725130893.jpeg",
    bairro: "Ipanema",
    time: "08:33"
  },
  {
    coordinate: "-32.034647, -21.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725121573.jpeg",
    bairro: "Ipanema",
    time: "07:32"
  },
  {
    coordinate: "-10.034647, -91.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725130910.jpeg",
    bairro: "Praia de Belas",
    time: "08:33"
  },
    {
    coordinate: "-10.034647, -21.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725099915.jpeg",
    bairro: "Praia de Belas",
    time: "07:33"
  },
    {
    coordinate: "-10.034647, -91.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725124513.jpeg",
    bairro: "Praia de Belas",
    time: "08:33"
  },
      {
    coordinate: "-10.034647, -91.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725099814.png",
    bairro: "Praia de Belas",
    time: "08:33"
  },
  {
    coordinate: "-10.034647, -91.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725130883.jpeg",
    bairro: "Farrapos",
    time: "08:33"
  },
    {
    coordinate: "-10.034647, -91.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725130878.jpeg",
    bairro: "Farrapos",
    time: "08:33"
  },
    {
    coordinate: "-10.034647, -91.217658",
    image: "https://demo-creatus.s3.us-east-2.amazonaws.com/detected_person_1725130868.jpeg",
    bairro: "Farrapos",
    time: "08:33"
  },
  
];

exports.storeData = (req, res) => {
  const coordinate = req.body.coordinate;
  const image = req.body.image;
  const bairro = "Partenon"
  const now = new Date(); // Cria um objeto Date com o horário atual
  const hours = String(now.getHours()).padStart(2, '0'); // Obtém as horas e adiciona um zero à esquerda, se necessário
  const minutes = String(now.getMinutes()).padStart(2, '0'); 
  const time = `${hours}:${minutes}`

  if (!coordinate || !image) {
    return res.status(400).json({ error: 'Both image and coordinate must be present' });
  }

  storedData.push({
    coordinate: coordinate,
    image: image,
    bairro: bairro,
    time: time
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