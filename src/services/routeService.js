const { calculateDistanceMatrix } = require('../utils/distanceMatrix');

function* permute(arr, n = arr.length) {
  if (n <= 1) yield arr.slice();
  else {
    for (let i = 0; i < n; i++) {
      yield* permute(arr, n - 1);
      const j = n % 2 ? 0 : i;
      [arr[n - 1], arr[j]] = [arr[j], arr[n - 1]];
    }
  }
}

exports.findBestRoute = (coordinates) => {
  const distMatrix = calculateDistanceMatrix(coordinates);

  const points = [...Array(coordinates.length).keys()].slice(1);
  let bestRoute = null;
  let minDistance = Infinity;

  for (let perm of permute(points)) {
    const route = [0, ...perm];
    const currentDistance = calculateTotalDistance(route, distMatrix);
    if (currentDistance < minDistance) {
      minDistance = currentDistance;
      bestRoute = route;
    }
  }

  // Map the best route indexes to their corresponding coordinates as objects { lat, lng }
  const bestRouteCoordinates = bestRoute.map(index => ({
    lat: coordinates[index][0],
    lng: coordinates[index][1]
  }));

  return { bestRoute: bestRouteCoordinates, minDistance };
};

function calculateTotalDistance(route, distMatrix) {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += distMatrix[route[i]][route[i + 1]];
  }
  totalDistance += distMatrix[route[route.length - 1]][route[0]];  // Return to the start
  return totalDistance;
}