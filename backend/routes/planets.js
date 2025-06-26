import db from '../db.js';
import {
 count_planets,
 get_all_planets,
 get_planet_by_id,
 create_planet,
 update_planet,
 delete_planet,
 get_planets_with_galaxy,
 get_planets_by_galaxy,
 get_habitable_planets,
 get_planets_with_elements,
} from '../sql/planets.js';


export const getPlanetsCount = async (req, res) => {
 try {
   const [rows] = await db.query(count_planets);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting planets count:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getAllPlanets = async (req, res) => {
 try {
   const [rows] = await db.query(get_all_planets);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting all planets:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getPlanetById = async (req, res) => {
 try {
   const { id } = req.params;
   const [rows] = await db.query(get_planet_by_id, [id]);


   if (rows.length === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Planet not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting planet by id:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const createPlanet = async (req, res) => {
 try {
   const { nome, gravidade, habitavel, id_galaxia } = req.body;
   const [result] = await db.query(create_planet, [
     nome,
     gravidade,
     habitavel,
     id_galaxia,
   ]);


   res.writeHead(201, { 'Content-Type': 'application/json' });
   res.end(
     JSON.stringify({
       message: 'Planet created successfully',
       id: result.insertId,
     })
   );
 } catch (error) {
   console.error('Error creating planet:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const updatePlanet = async (req, res) => {
 try {
   const { id } = req.params;
   const { nome, gravidade, habitavel, id_galaxia } = req.body;


   const [result] = await db.query(update_planet, [
     nome,
     gravidade,
     habitavel,
     id_galaxia,
     id,
   ]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Planet not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Planet updated successfully' }));
 } catch (error) {
   console.error('Error updating planet:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const deletePlanet = async (req, res) => {
 try {
   const { id } = req.params;
   const [result] = await db.query(delete_planet, [id]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Planet not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Planet deleted successfully' }));
 } catch (error) {
   console.error('Error deleting planet:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getPlanetsWithGalaxy = async (req, res) => {
 try {
   const [rows] = await db.query(get_planets_with_galaxy);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting planets with galaxy:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getPlanetsByGalaxy = async (req, res) => {
 try {
   const { galaxyId } = req.params;
   const [rows] = await db.query(get_planets_by_galaxy, [galaxyId]);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting planets by galaxy:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getHabitablePlanets = async (req, res) => {
 try {
   const [rows] = await db.query(get_habitable_planets);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting habitable planets:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getPlanetsWithElements = async (req, res) => {
 try {
   const [rows] = await db.query(get_planets_with_elements);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting planets with elements:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};