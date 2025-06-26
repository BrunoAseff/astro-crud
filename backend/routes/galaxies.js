import db from '../db.js';
import {
 count_galaxies,
 get_all_galaxies,
 get_galaxy_by_id,
 create_galaxy,
 update_galaxy,
 delete_galaxy,
 get_galaxies_with_stats,
} from '../sql/galaxies.js';


export const getGalaxiesCount = async (req, res) => {
 try {
   const [rows] = await db.query(count_galaxies);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting galaxies count:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getAllGalaxies = async (req, res) => {
 try {
   const [rows] = await db.query(get_all_galaxies);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting all galaxies:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getGalaxyById = async (req, res) => {
 try {
   const { id } = req.params;
   const [rows] = await db.query(get_galaxy_by_id, [id]);


   if (rows.length === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Galaxy not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting galaxy by id:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const createGalaxy = async (req, res) => {
 try {
   const { nome, tipo, distancia_terra } = req.body;
   const [result] = await db.query(create_galaxy, [
     nome,
     tipo,
     distancia_terra,
   ]);


   res.writeHead(201, { 'Content-Type': 'application/json' });
   res.end(
     JSON.stringify({
       message: 'Galaxy created successfully',
       id: result.insertId,
     })
   );
 } catch (error) {
   console.error('Error creating galaxy:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const updateGalaxy = async (req, res) => {
 try {
   const { id } = req.params;
   const { nome, tipo, distancia_terra } = req.body;


   const [result] = await db.query(update_galaxy, [
     nome,
     tipo,
     distancia_terra,
     id,
   ]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Galaxy not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Galaxy updated successfully' }));
 } catch (error) {
   console.error('Error updating galaxy:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const deleteGalaxy = async (req, res) => {
 try {
   const { id } = req.params;
   const [result] = await db.query(delete_galaxy, [id]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Galaxy not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Galaxy deleted successfully' }));
 } catch (error) {
   console.error('Error deleting galaxy:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getGalaxiesWithStats = async (req, res) => {
 try {
   const [rows] = await db.query(get_galaxies_with_stats);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting galaxies with stats:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};