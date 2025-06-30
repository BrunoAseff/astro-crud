/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Setup
export const createDatabase = () => api.post('/setup/create-database');
export const insertData = () => api.post('/setup/insert-data');

// Galaxies
export const getGalaxiesCount = () => api.get('/galaxies/count');
export const getAllGalaxies = () => api.get('/galaxies');
export const getGalaxiesWithStats = () => api.get('/galaxies/stats');
export const createGalaxy = (data: any) => api.post('/galaxies', data);
export const updateGalaxy = (id: number, data: any) =>
  api.put(`/galaxies/${id}`, data);
export const deleteGalaxy = (id: number) => api.delete(`/galaxies/${id}`);

// Planets
export const getPlanetsCount = () => api.get('/planets/count');
export const getAllPlanets = () => api.get('/planets/with-galaxy');
export const getHabitablePlanetsCount = () =>
  api.get('/planets/habitable').then((res) => ({ total: res.data.length }));
export const createPlanet = (data: any) => api.post('/planets', data);
export const updatePlanet = (id: number, data: any) =>
  api.put(`/planets/${id}`, data);
export const deletePlanet = (id: number) => api.delete(`/planets/${id}`);

// Stars
export const getStarsCount = () => api.get('/stars/count');
export const getAllStars = () => api.get('/stars/with-galaxy');
export const getBrightestStar = () =>
  api.get('/stars/brightest').then((res) => res.data[0]);
export const createStar = (data: any) => api.post('/stars', data);
export const updateStar = (id: number, data: any) =>
  api.put(`/stars/${id}`, data);
export const deleteStar = (id: number) => api.delete(`/stars/${id}`);

// Elements
export const getElementsCount = () => api.get('/elements/count');
export const getAllElements = () => api.get('/elements/with-planets');
export const getMostCommonElement = () =>
  api.get('/elements/most-common').then((res) => res.data[0]);
export const createElement = (data: any) => api.post('/elements', data);
export const updateElement = (id: number, data: any) =>
  api.put(`/elements/${id}`, data);
export const deleteElement = (id: number) => api.delete(`/elements/${id}`);

// Clusters
export const getClustersCount = () => api.get('/clusters/count');
export const getAllClusters = () => api.get('/clusters/with-galaxy');
export const getClosestCluster = () =>
  api.get('/clusters/closest').then((res) => res.data[0]);
export const createCluster = (data: any) => api.post('/clusters', data);
export const updateCluster = (id: number, data: any) =>
  api.put(`/clusters/${id}`, data);
export const deleteCluster = (id: number) => api.delete(`/clusters/${id}`);

// Nebulae
export const getNebulaeCount = () => api.get('/nebulae/count');
export const getAllNebulae = () => api.get('/nebulae/with-galaxy');
export const getClosestNebula = () =>
  api.get('/nebulae/closest').then((res) => res.data[0]);
export const createNebula = (data: any) => api.post('/nebulae', data);
export const updateNebula = (id: number, data: any) =>
  api.put(`/nebulae/${id}`, data);
export const deleteNebula = (id: number) => api.delete(`/nebulae/${id}`);

// Exoplanets
export const getExoplanetsCount = () => api.get('/exoplanets/count');
export const getAllExoplanets = () => api.get('/exoplanets/with-star');
export const getLargestExoplanet = () =>
  api.get('/exoplanets/largest').then((res) => res.data[0]);
export const getMostMassiveExoplanet = () =>
  api.get('/exoplanets/most-massive').then((res) => res.data[0]);
export const createExoplanet = (data: any) => api.post('/exoplanets', data);
export const updateExoplanet = (id: number, data: any) =>
  api.put(`/exoplanets/${id}`, data);
export const deleteExoplanet = (id: number) => api.delete(`/exoplanets/${id}`);
