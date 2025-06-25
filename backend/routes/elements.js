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
    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting elements count:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllElements = async (req, res) => {
  try {
    const [rows] = await db.query(get_all_elements);
    res.json(rows);
  } catch (error) {
    console.error('Error getting all elements:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getElementById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(get_element_by_id, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Element not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting element by id:', error);
    res.status(500).json({ error: error.message });
  }
};

export const createElement = async (req, res) => {
  try {
    const { nome_elemento, sigla_elemento } = req.body;
    const [result] = await db.query(create_element, [
      nome_elemento,
      sigla_elemento,
    ]);

    res.status(201).json({
      message: 'Element created successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Error creating element:', error);
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ message: 'Element not found' });
    }

    res.json({ message: 'Element updated successfully' });
  } catch (error) {
    console.error('Error updating element:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteElement = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(delete_element, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Element not found' });
    }

    res.json({ message: 'Element deleted successfully' });
  } catch (error) {
    console.error('Error deleting element:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getElementsWithPlanets = async (req, res) => {
  try {
    const [rows] = await db.query(get_elements_with_planets);
    res.json(rows);
  } catch (error) {
    console.error('Error getting elements with planets:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getElementsByPlanet = async (req, res) => {
  try {
    const { planetId } = req.params;
    const [rows] = await db.query(get_elements_by_planet, [planetId]);
    res.json(rows);
  } catch (error) {
    console.error('Error getting elements by planet:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getMostCommonElements = async (req, res) => {
  try {
    const [rows] = await db.query(get_most_common_elements);
    res.json(rows);
  } catch (error) {
    console.error('Error getting most common elements:', error);
    res.status(500).json({ error: error.message });
  }
};
