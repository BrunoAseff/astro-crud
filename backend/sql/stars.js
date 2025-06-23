export const count_stars = 'SELECT COUNT(*) as total FROM ESTRELAS';

export const get_all_stars = 'SELECT * FROM ESTRELAS ORDER BY nome';

export const get_star_by_id = 'SELECT * FROM ESTRELAS WHERE id_estrela = ?';

export const create_star =
  'INSERT INTO ESTRELAS (nome, tipo, magnitude, id_galaxia) VALUES (?, ?, ?, ?)';

export const update_star =
  'UPDATE ESTRELAS SET nome = ?, tipo = ?, magnitude = ?, id_galaxia = ? WHERE id_estrela = ?';

export const delete_star = 'DELETE FROM ESTRELAS WHERE id_estrela = ?';

export const get_stars_with_galaxy = `
  SELECT 
    e.*,
    g.nome as nome_galaxia
  FROM ESTRELAS e
  LEFT JOIN GALAXIAS g ON e.id_galaxia = g.id_galaxia
  ORDER BY e.nome
`;

export const get_stars_by_galaxy =
  'SELECT * FROM ESTRELAS WHERE id_galaxia = ? ORDER BY nome';

export const get_brightest_stars =
  'SELECT * FROM ESTRELAS ORDER BY magnitude ASC LIMIT 10';

export const get_stars_with_exoplanets = `
  SELECT 
    e.*,
    g.nome as nome_galaxia,
    COUNT(ex.id_exoplaneta) as total_exoplanets
  FROM ESTRELAS e
  LEFT JOIN GALAXIAS g ON e.id_galaxia = g.id_galaxia
  LEFT JOIN EXOPLANETAS ex ON e.id_estrela = ex.id_estrela
  GROUP BY e.id_estrela
  HAVING total_exoplanets > 0
  ORDER BY total_exoplanets DESC
`;
