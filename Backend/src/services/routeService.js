const { calculateDistanceMatrix } = require('../utils/distanceMatrix');

function segmentRoute(route, distMatrix, maxDistance) {
  const segments = [];
  let currentSegment = [route[0]];
  let currentDistance = 0;

  for (let i = 0; i < route.length - 1; i++) {
      const legDistance = distMatrix[route[i]][route[i + 1]];
      const returnDistance = distMatrix[route[i + 1]][route[0]];

      if (currentDistance + legDistance + returnDistance > maxDistance) {
          segments.push([...currentSegment, route[0]]);
          currentSegment = [route[i + 1]];
          currentDistance = legDistance;
      } else {
          currentSegment.push(route[i + 1]);
          currentDistance += legDistance;
      }
  }

  if (currentSegment.length > 1) {
      segments.push([...currentSegment, route[0]]);
  }

  return segments;
}

function calculateSegmentDistance(segment, distMatrix) {
  let segmentDistance = 0;
  for (let i = 0; i < segment.length - 1; i++) {
      segmentDistance += distMatrix[segment[i]][segment[i + 1]];
  }
  return segmentDistance;
}

exports.findBestRoute = (coordinates) => {
  try {
      const distMatrix = calculateDistanceMatrix(coordinates);

      const mst = kruskalMST(distMatrix);

      const route = dfsMST(mst);

      const speed = 10; // km/h
      const batteryDuration = 1; // hours
      const safeBatteryPercentage = 0.9; // 90% of the battery
      const maxDistance = speed * batteryDuration * safeBatteryPercentage;

      const routeSegments = segmentRoute(route, distMatrix, maxDistance / 2);

      let totalDistance = 0;
      const segmentDistances = [];

      routeSegments.forEach(segment => {
          const segmentDistance = calculateSegmentDistance(segment, distMatrix);
          segmentDistances.push(segmentDistance);
          totalDistance += segmentDistance;
      });

      const segmentedRoutes = routeSegments.map(segment => {
          return segment.map(index => ({
              lat: coordinates[index][0],
              lng: coordinates[index][1]
          }));
      });

      console.log("Segment Distances: ", segmentDistances);

      const response = {
        segmentedRoutes,
        totalDistance,
        segmentDistances
    };
    
    console.log("Final Response: ", JSON.stringify(response, null, 2));
    
    return response;

  } catch (error) {
      console.error("Error in findBestRoute:", error);
      return {};
  }
};

function kruskalMST(distMatrix) {
    const edges = [];
    const n = distMatrix.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            edges.push([i, j, distMatrix[i][j]]);
        }
    }

    edges.sort((a, b) => a[2] - b[2]);

    const uf = new UnionFind(n);
    const mst = [];

    for (const [u, v, weight] of edges) {
        if (uf.find(u) !== uf.find(v)) {
            uf.union(u, v);
            mst.push([u, v]);
        }
    }

    return mst;
}

function dfsMST(mst, start = 0) {
    const adjList = {};
    for (const [u, v] of mst) {
        if (!adjList[u]) adjList[u] = [];
        if (!adjList[v]) adjList[v] = [];
        adjList[u].push(v);
        adjList[v].push(u);
    }

    const visited = new Set();
    const route = [];

    function dfs(node) {
        visited.add(node);
        route.push(node);

        for (const neighbor of adjList[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }

    dfs(start);
    route.push(start);
    return route;
}

class UnionFind {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(u) {
        if (this.parent[u] !== u) {
            this.parent[u] = this.find(this.parent[u]);
        }
        return this.parent[u];
    }

    union(u, v) {
        const rootU = this.find(u);
        const rootV = this.find(v);

        if (rootU !== rootV) {
            if (this.rank[rootU] > this.rank[rootV]) {
                this.parent[rootV] = rootU;
            } else if (this.rank[rootU] < this.rank[rootV]) {
                this.parent[rootV] = rootU;
            } else {
                this.parent[rootV] = rootU;
                this.rank[rootU] += 1;
            }
        }
    }
}