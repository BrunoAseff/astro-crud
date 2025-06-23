export const count_planets = 'SELECT COUNT(*) as total FROM PLANETAS';

export const get_all_planets = 'SELECT * FROM PLANETAS ORDER BY nome';

export const get_planet_by_id = 'SELECT * FROM PLANETAS WHERE id_planeta = ?';

export const create_planet =
  'INSERT INTO PLANETAS (nome, gravidade, habitavel, id_galaxia) VALUES (?, ?, ?, ?)';

export const update_planet =
  'UPDATE PLANETAS SET nome = ?, gravidade = ?, habitavel = ?, id_galaxia = ? WHERE id_planeta = ?';

export const delete_planet = 'DELETE FROM PLANETAS WHERE id_planeta = ?';

export const get_planets_with_galaxy = `
  SELECT 
    p.*,
    g.nome as nome_galaxia
  FROM PLANETAS p
  LEFT JOIN GALAXIAS g ON p.id_galaxia = g.id_galaxia
  ORDER BY p.nome
`;

export const get_planets_by_galaxy =
  'SELECT * FROM PLANETAS WHERE id_galaxia = ? ORDER BY nome';

export const get_habitable_planets =
  'SELECT * FROM PLANETAS WHERE habitavel = true ORDER BY nome';

export const get_planets_with_elements = `
  SELECT 
    p.*,
    g.nome as nome_galaxia,
    GROUP_CONCAT(e.nome_elemento) as elementos
  FROM PLANETAS p
  LEFT JOIN GALAXIAS g ON p.id_galaxia = g.id_galaxia
  LEFT JOIN PLANETA_ELEMENTOS pe ON p.id_planeta = pe.id_planeta
  LEFT JOIN ELEMENTOS e ON pe.id_elemento = e.id_elemento
  GROUP BY p.id_planeta
  ORDER BY p.nome
`;
