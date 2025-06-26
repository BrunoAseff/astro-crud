import db from '../db.js';
import {
 count_stars,
 get_all_stars,
 get_star_by_id,
 create_star,
 update_star,
 delete_star,
 get_stars_with_galaxy,
 get_stars_by_galaxy,
 get_brightest_stars,
 get_stars_with_exoplanets,
} from '../sql/stars.js';


export const getStarsCount = async (req, res) => {
 try {
   const [rows] = await db.query(count_stars);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting stars count:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getAllStars = async (req, res) => {
 try {
   const [rows] = await db.query(get_all_stars);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting all stars:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getStarById = async (req, res) => {
 try {
   const { id } = req.params;
   const [rows] = await db.query(get_star_by_id, [id]);


   if (rows.length === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Star not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting star by id:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const createStar = async (req, res) => {
 try {
   const { nome, tipo, magnitude, id_galaxia } = req.body;
   const [result] = await db.query(create_star, [
     nome,
     tipo,
     magnitude,
     id_galaxia,
   ]);


   res.writeHead(201, { 'Content-Type': 'application/json' });
   res.end(
     JSON.stringify({
       message: 'Star created successfully',
       id: result.insertId,
     })
   );
 } catch (error) {
   console.error('Error creating star:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const updateStar = async (req, res) => {
 try {
   const { id } = req.params;
   const { nome, tipo, magnitude, id_galaxia } = req.body;


   const [result] = await db.query(update_star, [
     nome,
     tipo,
     magnitude,
     id_galaxia,
     id,
   ]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Star not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Star updated successfully' }));
 } catch (error) {
   console.error('Error updating star:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const deleteStar = async (req, res) => {
 try {
   const { id } = req.params;
   const [result] = await db.query(delete_star, [id]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Star not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Star deleted successfully' }));
 } catch (error) {
   console.error('Error deleting star:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getStarsWithGalaxy = async (req, res) => {
 try {
   const [rows] = await db.query(get_stars_with_galaxy);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting stars with galaxy:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getStarsByGalaxy = async (req, res) => {
 try {
   const { galaxyId } = req.params;
   const [rows] = await db.query(get_stars_by_galaxy, [galaxyId]);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting stars by galaxy:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getBrightestStars = async (req, res) => {
 try {
   const [rows] = await db.query(get_brightest_stars);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting brightest stars:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getStarsWithExoplanets = async (req, res) => {
 try {
   const [rows] = await db.query(get_stars_with_exoplanets);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting stars with exoplanets:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};