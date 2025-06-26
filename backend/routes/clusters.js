import db from '../db.js';
import {
 count_clusters,
 get_all_clusters,
 get_cluster_by_id,
 create_cluster,
 update_cluster,
 delete_cluster,
 get_clusters_with_galaxy,
 get_clusters_by_galaxy,
 get_closest_clusters,
 get_clusters_by_type,
} from '../sql/clusters.js';


export const getClustersCount = async (req, res) => {
 try {
   const [rows] = await db.query(count_clusters);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting clusters count:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getAllClusters = async (req, res) => {
 try {
   const [rows] = await db.query(get_all_clusters);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting all clusters:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getClusterById = async (req, res) => {
 try {
   const { id } = req.params;
   const [rows] = await db.query(get_cluster_by_id, [id]);


   if (rows.length === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Cluster not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows[0]));
 } catch (error) {
   console.error('Error getting cluster by id:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const createCluster = async (req, res) => {
 try {
   const { nome, tipo, distancia_terra, id_galaxia } = req.body;
   const [result] = await db.query(create_cluster, [
     nome,
     tipo,
     distancia_terra,
     id_galaxia,
   ]);


   res.writeHead(201, { 'Content-Type': 'application/json' });
   res.end(
     JSON.stringify({
       message: 'Cluster created successfully',
       id: result.insertId,
     })
   );
 } catch (error) {
   console.error('Error creating cluster:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const updateCluster = async (req, res) => {
 try {
   const { id } = req.params;
   const { nome, tipo, distancia_terra, id_galaxia } = req.body;


   const [result] = await db.query(update_cluster, [
     nome,
     tipo,
     distancia_terra,
     id_galaxia,
     id,
   ]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Cluster not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Cluster updated successfully' }));
 } catch (error) {
   console.error('Error updating cluster:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const deleteCluster = async (req, res) => {
 try {
   const { id } = req.params;
   const [result] = await db.query(delete_cluster, [id]);


   if (result.affectedRows === 0) {
     res.writeHead(404, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Cluster not found' }));
     return;
   }


   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Cluster deleted successfully' }));
 } catch (error) {
   console.error('Error deleting cluster:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getClustersWithGalaxy = async (req, res) => {
 try {
   const [rows] = await db.query(get_clusters_with_galaxy);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting clusters with galaxy:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getClustersByGalaxy = async (req, res) => {
 try {
   const { galaxyId } = req.params;
   const [rows] = await db.query(get_clusters_by_galaxy, [galaxyId]);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting clusters by galaxy:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getClosestClusters = async (req, res) => {
 try {
   const [rows] = await db.query(get_closest_clusters);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting closest clusters:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};


export const getClustersByType = async (req, res) => {
 try {
   const { type } = req.params;
   const [rows] = await db.query(get_clusters_by_type, [type]);
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(rows));
 } catch (error) {
   console.error('Error getting clusters by type:', error);
   res.writeHead(500, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ error: error.message }));
 }
};