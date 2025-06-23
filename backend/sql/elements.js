export const count_elements = 'SELECT COUNT(*) as total FROM ELEMENTOS';

export const get_all_elements =
  'SELECT * FROM ELEMENTOS ORDER BY nome_elemento';

export const get_element_by_id =
  'SELECT * FROM ELEMENTOS WHERE id_elemento = ?';

export const create_element =
  'INSERT INTO ELEMENTOS (nome_elemento, sigla_elemento) VALUES (?, ?)';

export const update_element =
  'UPDATE ELEMENTOS SET nome_elemento = ?, sigla_elemento = ? WHERE id_elemento = ?';

export const delete_element = 'DELETE FROM ELEMENTOS WHERE id_elemento = ?';

export const get_elements_with_planets = `
  SELECT 
    e.*,
    COUNT(pe.id_planeta) as total_planets
  FROM ELEMENTOS e
  LEFT JOIN PLANETA_ELEMENTOS pe ON e.id_elemento = pe.id_elemento
  GROUP BY e.id_elemento
  ORDER BY e.nome_elemento
`;

export const get_elements_by_planet = `
  SELECT 
    e.*
  FROM ELEMENTOS e
  INNER JOIN PLANETA_ELEMENTOS pe ON e.id_elemento = pe.id_elemento
  WHERE pe.id_planeta = ?
  ORDER BY e.nome_elemento
`;

export const get_most_common_elements = `
  SELECT 
    e.*,
    COUNT(pe.id_planeta) as total_planets
  FROM ELEMENTOS e
  LEFT JOIN PLANETA_ELEMENTOS pe ON e.id_elemento = pe.id_elemento
  GROUP BY e.id_elemento
  HAVING total_planets > 0
  ORDER BY total_planets DESC
`;
