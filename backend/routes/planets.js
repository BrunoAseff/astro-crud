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
    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting planets count:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllPlanets = async (req, res) => {
  try {
    const [rows] = await db.query(get_all_planets);
    res.json(rows);
  } catch (error) {
    console.error('Error getting all planets:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getPlanetById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(get_planet_by_id, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Planet not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting planet by id:', error);
    res.status(500).json({ error: error.message });
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

    res.status(201).json({
      message: 'Planet created successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Error creating planet:', error);
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ message: 'Planet not found' });
    }

    res.json({ message: 'Planet updated successfully' });
  } catch (error) {
    console.error('Error updating planet:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deletePlanet = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(delete_planet, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Planet not found' });
    }

    res.json({ message: 'Planet deleted successfully' });
  } catch (error) {
    console.error('Error deleting planet:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getPlanetsWithGalaxy = async (req, res) => {
  try {
    const [rows] = await db.query(get_planets_with_galaxy);
    res.json(rows);
  } catch (error) {
    console.error('Error getting planets with galaxy:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getPlanetsByGalaxy = async (req, res) => {
  try {
    const { galaxyId } = req.params;
    const [rows] = await db.query(get_planets_by_galaxy, [galaxyId]);
    res.json(rows);
  } catch (error) {
    console.error('Error getting planets by galaxy:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getHabitablePlanets = async (req, res) => {
  try {
    const [rows] = await db.query(get_habitable_planets);
    res.json(rows);
  } catch (error) {
    console.error('Error getting habitable planets:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getPlanetsWithElements = async (req, res) => {
  try {
    const [rows] = await db.query(get_planets_with_elements);
    res.json(rows);
  } catch (error) {
    console.error('Error getting planets with elements:', error);
    res.status(500).json({ error: error.message });
  }
};
