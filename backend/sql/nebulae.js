export const count_nebulae = 'SELECT COUNT(*) as total FROM NEBULOSAS';

export const get_all_nebulae = 'SELECT * FROM NEBULOSAS ORDER BY nome';

export const get_nebula_by_id = 'SELECT * FROM NEBULOSAS WHERE id_nebulosa = ?';

export const create_nebula =
  'INSERT INTO NEBULOSAS (nome, tipo, distancia_terra, id_galaxia) VALUES (?, ?, ?, ?)';

export const update_nebula =
  'UPDATE NEBULOSAS SET nome = ?, tipo = ?, distancia_terra = ?, id_galaxia = ? WHERE id_nebulosa = ?';

export const delete_nebula = 'DELETE FROM NEBULOSAS WHERE id_nebulosa = ?';

export const get_nebulae_with_galaxy = `
  SELECT 
    n.*,
    g.nome as nome_galaxia
  FROM NEBULOSAS n
  LEFT JOIN GALAXIAS g ON n.id_galaxia = g.id_galaxia
  ORDER BY n.nome
`;

export const get_nebulae_by_galaxy =
  'SELECT * FROM NEBULOSAS WHERE id_galaxia = ? ORDER BY nome';

export const get_closest_nebulae =
  'SELECT * FROM NEBULOSAS ORDER BY distancia_terra ASC LIMIT 10';

export const get_nebulae_by_type =
  'SELECT * FROM NEBULOSAS WHERE tipo = ? ORDER BY nome';
