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
    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting clusters count:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllClusters = async (req, res) => {
  try {
    const [rows] = await db.query(get_all_clusters);
    res.json(rows);
  } catch (error) {
    console.error('Error getting all clusters:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getClusterById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(get_cluster_by_id, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Cluster not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting cluster by id:', error);
    res.status(500).json({ error: error.message });
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

    res.status(201).json({
      message: 'Cluster created successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Error creating cluster:', error);
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ message: 'Cluster not found' });
    }

    res.json({ message: 'Cluster updated successfully' });
  } catch (error) {
    console.error('Error updating cluster:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteCluster = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(delete_cluster, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cluster not found' });
    }

    res.json({ message: 'Cluster deleted successfully' });
  } catch (error) {
    console.error('Error deleting cluster:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getClustersWithGalaxy = async (req, res) => {
  try {
    const [rows] = await db.query(get_clusters_with_galaxy);
    res.json(rows);
  } catch (error) {
    console.error('Error getting clusters with galaxy:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getClustersByGalaxy = async (req, res) => {
  try {
    const { galaxyId } = req.params;
    const [rows] = await db.query(get_clusters_by_galaxy, [galaxyId]);
    res.json(rows);
  } catch (error) {
    console.error('Error getting clusters by galaxy:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getClosestClusters = async (req, res) => {
  try {
    const [rows] = await db.query(get_closest_clusters);
    res.json(rows);
  } catch (error) {
    console.error('Error getting closest clusters:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getClustersByType = async (req, res) => {
  try {
    const { type } = req.params;
    const [rows] = await db.query(get_clusters_by_type, [type]);
    res.json(rows);
  } catch (error) {
    console.error('Error getting clusters by type:', error);
    res.status(500).json({ error: error.message });
  }
};
