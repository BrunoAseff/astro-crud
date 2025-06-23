export const count_galaxies = 'SELECT COUNT(*) as total FROM GALAXIAS';

export const get_all_galaxies = 'SELECT * FROM GALAXIAS ORDER BY nome';

export const get_galaxy_by_id = 'SELECT * FROM GALAXIAS WHERE id_galaxia = ?';

export const create_galaxy =
  'INSERT INTO GALAXIAS (nome, tipo, distancia_terra) VALUES (?, ?, ?)';

export const update_galaxy =
  'UPDATE GALAXIAS SET nome = ?, tipo = ?, distancia_terra = ? WHERE id_galaxia = ?';

export const delete_galaxy = 'DELETE FROM GALAXIAS WHERE id_galaxia = ?';

export const get_galaxies_with_stats = `
  SELECT 
    g.*,
    COUNT(DISTINCT p.id_planeta) as total_planets,
    COUNT(DISTINCT e.id_estrela) as total_stars,
    COUNT(DISTINCT a.id_aglomerado) as total_clusters,
    COUNT(DISTINCT n.id_nebulosa) as total_nebulae
  FROM GALAXIAS g
  LEFT JOIN PLANETAS p ON g.id_galaxia = p.id_galaxia
  LEFT JOIN ESTRELAS e ON g.id_galaxia = e.id_galaxia
  LEFT JOIN AGLOMERADOS a ON g.id_galaxia = a.id_galaxia
  LEFT JOIN NEBULOSAS n ON g.id_galaxia = n.id_galaxia
  GROUP BY g.id_galaxia
  ORDER BY g.nome
`;
