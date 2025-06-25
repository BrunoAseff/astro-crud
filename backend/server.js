const http = require('http');
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3001;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url;
  const method = req.method;

  try {
    if (url === '/api/setup/create-database' && method === 'POST') {
      const { createDatabase } = await import('./routes/setup.js');
      await createDatabase(req, res);
    } else if (url === '/api/setup/insert-data' && method === 'POST') {
      const { insertData } = await import('./routes/setup.js');
      await insertData(req, res);
    } else if (url === '/api/galaxies/count' && method === 'GET') {
      const { getGalaxiesCount } = await import('./routes/galaxies.js');
      await getGalaxiesCount(req, res);
    } else if (url === '/api/galaxies' && method === 'GET') {
      const { getAllGalaxies } = await import('./routes/galaxies.js');
      await getAllGalaxies(req, res);
    } else if (url.match(/^\/api\/galaxies\/(\d+)$/) && method === 'GET') {
      const { getGalaxyById } = await import('./routes/galaxies.js');
      req.params = { id: url.split('/')[3] };
      await getGalaxyById(req, res);
    } else if (url === '/api/galaxies' && method === 'POST') {
      const { createGalaxy } = await import('./routes/galaxies.js');
      await createGalaxy(req, res);
    } else if (url.match(/^\/api\/galaxies\/(\d+)$/) && method === 'PUT') {
      const { updateGalaxy } = await import('./routes/galaxies.js');
      req.params = { id: url.split('/')[3] };
      await updateGalaxy(req, res);
    } else if (url.match(/^\/api\/galaxies\/(\d+)$/) && method === 'DELETE') {
      const { deleteGalaxy } = await import('./routes/galaxies.js');
      req.params = { id: url.split('/')[3] };
      await deleteGalaxy(req, res);
    } else if (url === '/api/galaxies/stats' && method === 'GET') {
      const { getGalaxiesWithStats } = await import('./routes/galaxies.js');
      await getGalaxiesWithStats(req, res);
    } else if (url === '/api/planets/count' && method === 'GET') {
      const { getPlanetsCount } = await import('./routes/planets.js');
      await getPlanetsCount(req, res);
    } else if (url === '/api/planets' && method === 'GET') {
      const { getAllPlanets } = await import('./routes/planets.js');
      await getAllPlanets(req, res);
    } else if (url.match(/^\/api\/planets\/(\d+)$/) && method === 'GET') {
      const { getPlanetById } = await import('./routes/planets.js');
      req.params = { id: url.split('/')[3] };
      await getPlanetById(req, res);
    } else if (url === '/api/planets' && method === 'POST') {
      const { createPlanet } = await import('./routes/planets.js');
      await createPlanet(req, res);
    } else if (url.match(/^\/api\/planets\/(\d+)$/) && method === 'PUT') {
      const { updatePlanet } = await import('./routes/planets.js');
      req.params = { id: url.split('/')[3] };
      await updatePlanet(req, res);
    } else if (url.match(/^\/api\/planets\/(\d+)$/) && method === 'DELETE') {
      const { deletePlanet } = await import('./routes/planets.js');
      req.params = { id: url.split('/')[3] };
      await deletePlanet(req, res);
    } else if (url === '/api/planets/with-galaxy' && method === 'GET') {
      const { getPlanetsWithGalaxy } = await import('./routes/planets.js');
      await getPlanetsWithGalaxy(req, res);
    } else if (
      url.match(/^\/api\/planets\/galaxy\/(\d+)$/) &&
      method === 'GET'
    ) {
      const { getPlanetsByGalaxy } = await import('./routes/planets.js');
      req.params = { galaxyId: url.split('/')[4] };
      await getPlanetsByGalaxy(req, res);
    } else if (url === '/api/planets/habitable' && method === 'GET') {
      const { getHabitablePlanets } = await import('./routes/planets.js');
      await getHabitablePlanets(req, res);
    } else if (url === '/api/planets/with-elements' && method === 'GET') {
      const { getPlanetsWithElements } = await import('./routes/planets.js');
      await getPlanetsWithElements(req, res);
    } else if (url === '/api/stars/count' && method === 'GET') {
      const { getStarsCount } = await import('./routes/stars.js');
      await getStarsCount(req, res);
    } else if (url === '/api/stars' && method === 'GET') {
      const { getAllStars } = await import('./routes/stars.js');
      await getAllStars(req, res);
    } else if (url.match(/^\/api\/stars\/(\d+)$/) && method === 'GET') {
      const { getStarById } = await import('./routes/stars.js');
      req.params = { id: url.split('/')[3] };
      await getStarById(req, res);
    } else if (url === '/api/stars' && method === 'POST') {
      const { createStar } = await import('./routes/stars.js');
      await createStar(req, res);
    } else if (url.match(/^\/api\/stars\/(\d+)$/) && method === 'PUT') {
      const { updateStar } = await import('./routes/stars.js');
      req.params = { id: url.split('/')[3] };
      await updateStar(req, res);
    } else if (url.match(/^\/api\/stars\/(\d+)$/) && method === 'DELETE') {
      const { deleteStar } = await import('./routes/stars.js');
      req.params = { id: url.split('/')[3] };
      await deleteStar(req, res);
    } else if (url === '/api/stars/with-galaxy' && method === 'GET') {
      const { getStarsWithGalaxy } = await import('./routes/stars.js');
      await getStarsWithGalaxy(req, res);
    } else if (url.match(/^\/api\/stars\/galaxy\/(\d+)$/) && method === 'GET') {
      const { getStarsByGalaxy } = await import('./routes/stars.js');
      req.params = { galaxyId: url.split('/')[4] };
      await getStarsByGalaxy(req, res);
    } else if (url === '/api/stars/brightest' && method === 'GET') {
      const { getBrightestStars } = await import('./routes/stars.js');
      await getBrightestStars(req, res);
    } else if (url === '/api/stars/with-exoplanets' && method === 'GET') {
      const { getStarsWithExoplanets } = await import('./routes/stars.js');
      await getStarsWithExoplanets(req, res);
    } else if (url === '/api/elements/count' && method === 'GET') {
      const { getElementsCount } = await import('./routes/elements.js');
      await getElementsCount(req, res);
    } else if (url === '/api/elements' && method === 'GET') {
      const { getAllElements } = await import('./routes/elements.js');
      await getAllElements(req, res);
    } else if (url.match(/^\/api\/elements\/(\d+)$/) && method === 'GET') {
      const { getElementById } = await import('./routes/elements.js');
      req.params = { id: url.split('/')[3] };
      await getElementById(req, res);
    } else if (url === '/api/elements' && method === 'POST') {
      const { createElement } = await import('./routes/elements.js');
      await createElement(req, res);
    } else if (url.match(/^\/api\/elements\/(\d+)$/) && method === 'PUT') {
      const { updateElement } = await import('./routes/elements.js');
      req.params = { id: url.split('/')[3] };
      await updateElement(req, res);
    } else if (url.match(/^\/api\/elements\/(\d+)$/) && method === 'DELETE') {
      const { deleteElement } = await import('./routes/elements.js');
      req.params = { id: url.split('/')[3] };
      await deleteElement(req, res);
    } else if (url === '/api/elements/with-planets' && method === 'GET') {
      const { getElementsWithPlanets } = await import('./routes/elements.js');
      await getElementsWithPlanets(req, res);
    } else if (
      url.match(/^\/api\/elements\/planet\/(\d+)$/) &&
      method === 'GET'
    ) {
      const { getElementsByPlanet } = await import('./routes/elements.js');
      req.params = { planetId: url.split('/')[4] };
      await getElementsByPlanet(req, res);
    } else if (url === '/api/elements/most-common' && method === 'GET') {
      const { getMostCommonElements } = await import('./routes/elements.js');
      await getMostCommonElements(req, res);
    } else if (url === '/api/clusters/count' && method === 'GET') {
      const { getClustersCount } = await import('./routes/clusters.js');
      await getClustersCount(req, res);
    } else if (url === '/api/clusters' && method === 'GET') {
      const { getAllClusters } = await import('./routes/clusters.js');
      await getAllClusters(req, res);
    } else if (url.match(/^\/api\/clusters\/(\d+)$/) && method === 'GET') {
      const { getClusterById } = await import('./routes/clusters.js');
      req.params = { id: url.split('/')[3] };
      await getClusterById(req, res);
    } else if (url === '/api/clusters' && method === 'POST') {
      const { createCluster } = await import('./routes/clusters.js');
      await createCluster(req, res);
    } else if (url.match(/^\/api\/clusters\/(\d+)$/) && method === 'PUT') {
      const { updateCluster } = await import('./routes/clusters.js');
      req.params = { id: url.split('/')[3] };
      await updateCluster(req, res);
    } else if (url.match(/^\/api\/clusters\/(\d+)$/) && method === 'DELETE') {
      const { deleteCluster } = await import('./routes/clusters.js');
      req.params = { id: url.split('/')[3] };
      await deleteCluster(req, res);
    } else if (url === '/api/clusters/with-galaxy' && method === 'GET') {
      const { getClustersWithGalaxy } = await import('./routes/clusters.js');
      await getClustersWithGalaxy(req, res);
    } else if (
      url.match(/^\/api\/clusters\/galaxy\/(\d+)$/) &&
      method === 'GET'
    ) {
      const { getClustersByGalaxy } = await import('./routes/clusters.js');
      req.params = { galaxyId: url.split('/')[4] };
      await getClustersByGalaxy(req, res);
    } else if (url === '/api/clusters/closest' && method === 'GET') {
      const { getClosestClusters } = await import('./routes/clusters.js');
      await getClosestClusters(req, res);
    } else if (url.match(/^\/api\/clusters\/type\/(.+)$/) && method === 'GET') {
      const { getClustersByType } = await import('./routes/clusters.js');
      req.params = { type: url.split('/')[4] };
      await getClustersByType(req, res);
    } else if (url === '/api/nebulae/count' && method === 'GET') {
      const { getNebulaeCount } = await import('./routes/nebulae.js');
      await getNebulaeCount(req, res);
    } else if (url === '/api/nebulae' && method === 'GET') {
      const { getAllNebulae } = await import('./routes/nebulae.js');
      await getAllNebulae(req, res);
    } else if (url.match(/^\/api\/nebulae\/(\d+)$/) && method === 'GET') {
      const { getNebulaById } = await import('./routes/nebulae.js');
      req.params = { id: url.split('/')[3] };
      await getNebulaById(req, res);
    } else if (url === '/api/nebulae' && method === 'POST') {
      const { createNebula } = await import('./routes/nebulae.js');
      await createNebula(req, res);
    } else if (url.match(/^\/api\/nebulae\/(\d+)$/) && method === 'PUT') {
      const { updateNebula } = await import('./routes/nebulae.js');
      req.params = { id: url.split('/')[3] };
      await updateNebula(req, res);
    } else if (url.match(/^\/api\/nebulae\/(\d+)$/) && method === 'DELETE') {
      const { deleteNebula } = await import('./routes/nebulae.js');
      req.params = { id: url.split('/')[3] };
      await deleteNebula(req, res);
    } else if (url === '/api/nebulae/with-galaxy' && method === 'GET') {
      const { getNebulaeWithGalaxy } = await import('./routes/nebulae.js');
      await getNebulaeWithGalaxy(req, res);
    } else if (
      url.match(/^\/api\/nebulae\/galaxy\/(\d+)$/) &&
      method === 'GET'
    ) {
      const { getNebulaeByGalaxy } = await import('./routes/nebulae.js');
      req.params = { galaxyId: url.split('/')[4] };
      await getNebulaeByGalaxy(req, res);
    } else if (url === '/api/nebulae/closest' && method === 'GET') {
      const { getClosestNebulae } = await import('./routes/nebulae.js');
      await getClosestNebulae(req, res);
    } else if (url.match(/^\/api\/nebulae\/type\/(.+)$/) && method === 'GET') {
      const { getNebulaeByType } = await import('./routes/nebulae.js');
      req.params = { type: url.split('/')[4] };
      await getNebulaeByType(req, res);
    } else if (url === '/api/exoplanets/count' && method === 'GET') {
      const { getExoplanetsCount } = await import('./routes/exoplanets.js');
      await getExoplanetsCount(req, res);
    } else if (url === '/api/exoplanets' && method === 'GET') {
      const { getAllExoplanets } = await import('./routes/exoplanets.js');
      await getAllExoplanets(req, res);
    } else if (url.match(/^\/api\/exoplanets\/(\d+)$/) && method === 'GET') {
      const { getExoplanetById } = await import('./routes/exoplanets.js');
      req.params = { id: url.split('/')[3] };
      await getExoplanetById(req, res);
    } else if (url === '/api/exoplanets' && method === 'POST') {
      const { createExoplanet } = await import('./routes/exoplanets.js');
      await createExoplanet(req, res);
    } else if (url.match(/^\/api\/exoplanets\/(\d+)$/) && method === 'PUT') {
      const { updateExoplanet } = await import('./routes/exoplanets.js');
      req.params = { id: url.split('/')[3] };
      await updateExoplanet(req, res);
    } else if (url.match(/^\/api\/exoplanets\/(\d+)$/) && method === 'DELETE') {
      const { deleteExoplanet } = await import('./routes/exoplanets.js');
      req.params = { id: url.split('/')[3] };
      await deleteExoplanet(req, res);
    } else if (url === '/api/exoplanets/with-star' && method === 'GET') {
      const { getExoplanetsWithStar } = await import('./routes/exoplanets.js');
      await getExoplanetsWithStar(req, res);
    } else if (
      url.match(/^\/api\/exoplanets\/star\/(\d+)$/) &&
      method === 'GET'
    ) {
      const { getExoplanetsByStar } = await import('./routes/exoplanets.js');
      req.params = { starId: url.split('/')[4] };
      await getExoplanetsByStar(req, res);
    } else if (url === '/api/exoplanets/largest' && method === 'GET') {
      const { getLargestExoplanets } = await import('./routes/exoplanets.js');
      await getLargestExoplanets(req, res);
    } else if (url === '/api/exoplanets/most-massive' && method === 'GET') {
      const { getMostMassiveExoplanets } = await import(
        './routes/exoplanets.js'
      );
      await getMostMassiveExoplanets(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
});

server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
