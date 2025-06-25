import db from '../db.js';
import {
  count_nebulae,
  get_all_nebulae,
  get_nebula_by_id,
  create_nebula,
  update_nebula,
  delete_nebula,
  get_nebulae_with_galaxy,
  get_nebulae_by_galaxy,
  get_closest_nebulae,
  get_nebulae_by_type,
} from '../sql/nebulae.js';

export const getNebulaeCount = async (req, res) => {
  try {
    const [rows] = await db.query(count_nebulae);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting nebulae count:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllNebulae = async (req, res) => {
  try {
    const [rows] = await db.query(get_all_nebulae);
    res.json(rows);
  } catch (error) {
    console.error('Error getting all nebulae:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getNebulaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(get_nebula_by_id, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Nebula not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting nebula by id:', error);
    res.status(500).json({ error: error.message });
  }
};

export const createNebula = async (req, res) => {
  try {
    const { nome, tipo, distancia_terra, id_galaxia } = req.body;
    const [result] = await db.query(create_nebula, [
      nome,
      tipo,
      distancia_terra,
      id_galaxia,
    ]);

    res.status(201).json({
      message: 'Nebula created successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Error creating nebula:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateNebula = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tipo, distancia_terra, id_galaxia } = req.body;

    const [result] = await db.query(update_nebula, [
      nome,
      tipo,
      distancia_terra,
      id_galaxia,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Nebula not found' });
    }

    res.json({ message: 'Nebula updated successfully' });
  } catch (error) {
    console.error('Error updating nebula:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteNebula = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(delete_nebula, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Nebula not found' });
    }

    res.json({ message: 'Nebula deleted successfully' });
  } catch (error) {
    console.error('Error deleting nebula:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getNebulaeWithGalaxy = async (req, res) => {
  try {
    const [rows] = await db.query(get_nebulae_with_galaxy);
    res.json(rows);
  } catch (error) {
    console.error('Error getting nebulae with galaxy:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getNebulaeByGalaxy = async (req, res) => {
  try {
    const { galaxyId } = req.params;
    const [rows] = await db.query(get_nebulae_by_galaxy, [galaxyId]);
    res.json(rows);
  } catch (error) {
    console.error('Error getting nebulae by galaxy:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getClosestNebulae = async (req, res) => {
  try {
    const [rows] = await db.query(get_closest_nebulae);
    res.json(rows);
  } catch (error) {
    console.error('Error getting closest nebulae:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getNebulaeByType = async (req, res) => {
  try {
    const { type } = req.params;
    const [rows] = await db.query(get_nebulae_by_type, [type]);
    res.json(rows);
  } catch (error) {
    console.error('Error getting nebulae by type:', error);
    res.status(500).json({ error: error.message });
  }
};
