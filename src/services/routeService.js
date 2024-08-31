const { calculateDistanceMatrix } = require('../utils/distanceMatrix');

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
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
        this.parent[rootU] = rootU;
      } else {
        this.parent[rootV] = rootU;
        this.rank[rootU] += 1;
      }
    }
  }
}

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

exports.findBestRoute = (coordinates) => {
  const distMatrix = calculateDistanceMatrix(coordinates);

  const mst = kruskalMST(distMatrix);

  const route = dfsMST(mst);

  const minDistance = calculateTotalDistance(route, distMatrix);

  const bestRouteCoordinates = route.map(index => ({
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
  return totalDistance;
}
