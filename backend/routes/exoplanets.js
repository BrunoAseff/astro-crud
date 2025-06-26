import db from '../db.js';
import {
 count_exoplanets,
 get_all_exoplanets,
 get_exoplanet_by_id,
 create_exoplanet,
 update_exoplanet,
 delete_exoplanet,
 get_exoplanets_with_star,
 get_exoplanets_by_star,
 get_largest_exoplanets,
 get_most_massive_exoplanets,
} from '../sql/exoplanets.js';


export const getExoplanetsCount = async (req, res) => {
 try {
   const [rows] = await db.query(count_exoplanets);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting exoplanets count:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getAllExoplanets = async (req, res) => {
 try {
   const [rows] = await db.query(get_all_exoplanets);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting all exoplanets:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getExoplanetById = async (req, res) => {
 try {
   const { id } = req.params;
   const [rows] = await db.query(get_exoplanet_by_id, [id]);


   if (rows.length === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Exoplanet not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting exoplanet by id:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const createExoplanet = async (req, res) => {
 try {
   const { nome, massa, raio, id_estrela } = req.body;
   const [result] = await db.query(create_exoplanet, [
     nome,
     massa,
     raio,
     id_estrela,
   ]);


   res.writeHead(201, { 'Content-Type': 'application/json' });
   res.end(
     JSON.stringify({
       message: 'Exoplanet created successfully',
       id: result.insertId,
     })
   );
 } catch (error) {
   console.error('Error creating exoplanet:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const updateExoplanet = async (req, res) => {
 try {
   const { id } = req.params;
   const { nome, massa, raio, id_estrela } = req.body;


   const [result] = await db.query(update_exoplanet, [
     nome,
     massa,
     raio,
     id_estrela,
     id,
   ]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Exoplanet not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Exoplanet updated successfully' }));
 } catch (error) {
   console.error('Error updating exoplanet:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const deleteExoplanet = async (req, res) => {
 try {
   const { id } = req.params;
   const [result] = await db.query(delete_exoplanet, [id]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Exoplanet not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Exoplanet deleted successfully' }));
 } catch (error) {
   console.error('Error deleting exoplanet:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getExoplanetsWithStar = async (req, res) => {
 try {
   const [rows] = await db.query(get_exoplanets_with_star);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting exoplanets with star:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getExoplanetsByStar = async (req, res) => {
 try {
   const { starId } = req.params;
   const [rows] = await db.query(get_exoplanets_by_star, [starId]);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting exoplanets by star:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getLargestExoplanets = async (req, res) => {
 try {
   const [rows] = await db.query(get_largest_exoplanets);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting largest exoplanets:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getMostMassiveExoplanets = async (req, res) => {
 try {
   const [rows] = await db.query(get_most_massive_exoplanets);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting most massive exoplanets:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};