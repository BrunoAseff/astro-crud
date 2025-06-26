import db from '../db.js';
import {
 create_database,
 use_database,
 create_galaxies_table,
 create_planets_table,
 create_elements_table,
 create_planet_elements_table,
 create_stars_table,
 create_clusters_table,
 create_nebulae_table,
 create_exoplanets_table,
 insert_galaxies,
 insert_elements,
 insert_planets,
 insert_stars,
 insert_planet_elements,
 insert_clusters,
 insert_nebulae,
 insert_exoplanets,
} from '../sql/setup.js';


export const createDatabase = async (req, res) => {
 try {
   await db.query(create_database);
   await db.query(use_database);


   await db.query(create_galaxies_table);
   await db.query(create_planets_table);
   await db.query(create_elements_table);
   await db.query(create_planet_elements_table);
   await db.query(create_stars_table);
   await db.query(create_clusters_table);
   await db.query(create_nebulae_table);
   await db.query(create_exoplanets_table);


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(
     JSON.stringify({ message: 'Database and tables created successfully' })
   );
 } catch (error) {
   console.error('Error creating database:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const insertData = async (req, res) => {
 try {
   await db.query(insert_galaxies);
   await db.query(insert_elements);
   await db.query(insert_planets);
   await db.query(insert_stars);
   await db.query(insert_planet_elements);
   await db.query(insert_clusters);
   await db.query(insert_nebulae);
   await db.query(insert_exoplanets);


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Sample data inserted successfully' }));
 } catch (error) {
   console.error('Error inserting data:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};



