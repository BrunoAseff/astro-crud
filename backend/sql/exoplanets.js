export const count_exoplanets = 'SELECT COUNT(*) as total FROM EXOPLANETAS';

export const get_all_exoplanets = 'SELECT * FROM EXOPLANETAS ORDER BY nome';

export const get_exoplanet_by_id =
  'SELECT * FROM EXOPLANETAS WHERE id_exoplaneta = ?';

export const create_exoplanet =
  'INSERT INTO EXOPLANETAS (nome, massa, raio, id_estrela) VALUES (?, ?, ?, ?)';

export const update_exoplanet =
  'UPDATE EXOPLANETAS SET nome = ?, massa = ?, raio = ?, id_estrela = ? WHERE id_exoplaneta = ?';

export const delete_exoplanet =
  'DELETE FROM EXOPLANETAS WHERE id_exoplaneta = ?';

export const get_exoplanets_with_star = `
  SELECT 
    ex.*,
    e.nome as nome_estrela,
    g.nome as nome_galaxia
  FROM EXOPLANETAS ex
  LEFT JOIN ESTRELAS e ON ex.id_estrela = e.id_estrela
  LEFT JOIN GALAXIAS g ON e.id_galaxia = g.id_galaxia
  ORDER BY ex.nome
`;

export const get_exoplanets_by_star =
  'SELECT * FROM EXOPLANETAS WHERE id_estrela = ? ORDER BY nome';

export const get_largest_exoplanets =
  'SELECT * FROM EXOPLANETAS ORDER BY raio DESC LIMIT 10';

export const get_most_massive_exoplanets =
  'SELECT * FROM EXOPLANETAS ORDER BY massa DESC LIMIT 10';
