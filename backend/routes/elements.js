import db from '../db.js';
import {
 count_elements,
 get_all_elements,
 get_element_by_id,
 create_element,
 update_element,
 delete_element,
 get_elements_with_planets,
 get_elements_by_planet,
 get_most_common_elements,
} from '../sql/elements.js';


export const getElementsCount = async (req, res) => {
 try {
   const [rows] = await db.query(count_elements);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting elements count:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getAllElements = async (req, res) => {
 try {
   const [rows] = await db.query(get_all_elements);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting all elements:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getElementById = async (req, res) => {
 try {
   const { id } = req.params;
   const [rows] = await db.query(get_element_by_id, [id]);


   if (rows.length === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Element not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting element by id:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const createElement = async (req, res) => {
 try {
   const { nome_elemento, sigla_elemento } = req.body;
   const [result] = await db.query(create_element, [
     nome_elemento,
     sigla_elemento,
   ]);


   res.writeHead(201, { 'Content-Type': 'application/json' });
   res.end(
     JSON.stringify({
       message: 'Element created successfully',
       id: result.insertId,
     })
   );
 } catch (error) {
   console.error('Error creating element:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const updateElement = async (req, res) => {
 try {
   const { id } = req.params;
   const { nome_elemento, sigla_elemento } = req.body;


   const [result] = await db.query(update_element, [
     nome_elemento,
     sigla_elemento,
     id,
   ]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Element not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Element updated successfully' }));
 } catch (error) {
   console.error('Error updating element:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const deleteElement = async (req, res) => {
 try {
   const { id } = req.params;
   const [result] = await db.query(delete_element, [id]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Element not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Element deleted successfully' }));
 } catch (error) {
   console.error('Error deleting element:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getElementsWithPlanets = async (req, res) => {
 try {
   const [rows] = await db.query(get_elements_with_planets);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting elements with planets:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getElementsByPlanet = async (req, res) => {
 try {
   const { planetId } = req.params;
   const [rows] = await db.query(get_elements_by_planet, [planetId]);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting elements by planet:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getMostCommonElements = async (req, res) => {
 try {
   const [rows] = await db.query(get_most_common_elements);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting most common elements:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};