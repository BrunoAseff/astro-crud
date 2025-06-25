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
    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting exoplanets count:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllExoplanets = async (req, res) => {
  try {
    const [rows] = await db.query(get_all_exoplanets);
    res.json(rows);
  } catch (error) {
    console.error('Error getting all exoplanets:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getExoplanetById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(get_exoplanet_by_id, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Exoplanet not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting exoplanet by id:', error);
    res.status(500).json({ error: error.message });
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

    res.status(201).json({
      message: 'Exoplanet created successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Error creating exoplanet:', error);
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ message: 'Exoplanet not found' });
    }

    res.json({ message: 'Exoplanet updated successfully' });
  } catch (error) {
    console.error('Error updating exoplanet:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteExoplanet = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(delete_exoplanet, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Exoplanet not found' });
    }

    res.json({ message: 'Exoplanet deleted successfully' });
  } catch (error) {
    console.error('Error deleting exoplanet:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getExoplanetsWithStar = async (req, res) => {
  try {
    const [rows] = await db.query(get_exoplanets_with_star);
    res.json(rows);
  } catch (error) {
    console.error('Error getting exoplanets with star:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getExoplanetsByStar = async (req, res) => {
  try {
    const { starId } = req.params;
    const [rows] = await db.query(get_exoplanets_by_star, [starId]);
    res.json(rows);
  } catch (error) {
    console.error('Error getting exoplanets by star:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getLargestExoplanets = async (req, res) => {
  try {
    const [rows] = await db.query(get_largest_exoplanets);
    res.json(rows);
  } catch (error) {
    console.error('Error getting largest exoplanets:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getMostMassiveExoplanets = async (req, res) => {
  try {
    const [rows] = await db.query(get_most_massive_exoplanets);
    res.json(rows);
  } catch (error) {
    console.error('Error getting most massive exoplanets:', error);
    res.status(500).json({ error: error.message });
  }
};
