export const count_clusters = 'SELECT COUNT(*) as total FROM AGLOMERADOS';

export const get_all_clusters = 'SELECT * FROM AGLOMERADOS ORDER BY nome';

export const get_cluster_by_id =
  'SELECT * FROM AGLOMERADOS WHERE id_aglomerado = ?';

export const create_cluster =
  'INSERT INTO AGLOMERADOS (nome, tipo, distancia_terra, id_galaxia) VALUES (?, ?, ?, ?)';

export const update_cluster =
  'UPDATE AGLOMERADOS SET nome = ?, tipo = ?, distancia_terra = ?, id_galaxia = ? WHERE id_aglomerado = ?';

export const delete_cluster = 'DELETE FROM AGLOMERADOS WHERE id_aglomerado = ?';

export const get_clusters_with_galaxy = `
  SELECT 
    a.*,
    g.nome as nome_galaxia
  FROM AGLOMERADOS a
  LEFT JOIN GALAXIAS g ON a.id_galaxia = g.id_galaxia
  ORDER BY a.nome
`;

export const get_clusters_by_galaxy =
  'SELECT * FROM AGLOMERADOS WHERE id_galaxia = ? ORDER BY nome';

export const get_closest_clusters =
  'SELECT * FROM AGLOMERADOS ORDER BY distancia_terra ASC LIMIT 10';

export const get_clusters_by_type =
  'SELECT * FROM AGLOMERADOS WHERE tipo = ? ORDER BY nome';
