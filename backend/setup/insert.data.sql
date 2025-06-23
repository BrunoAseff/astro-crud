USE astro_db;

INSERT INTO GALAXIAS (nome, tipo, distancia_terra) VALUES
('Via Láctea', 'Espiral Barrada', 0.00),
('Andrômeda', 'Espiral', 2537000.00),
('Galáxia do Triângulo', 'Espiral', 3000000.00);

INSERT INTO ELEMENTOS (nome_elemento, sigla_elemento) VALUES
('Hidrogênio', 'H'),
('Oxigênio', 'O'),
('Nitrogênio', 'N'),
('Carbono', 'C'),
('Hélio', 'He');

INSERT INTO PLANETAS (nome, gravidade, habitavel, id_galaxia) VALUES
('Terra', 9.81, true, 1),
('Marte', 3.72, false, 1),
('Kepler-186f', 11.0, true, 1),
('Proxima Centauri b', 10.8, true, 1);

INSERT INTO ESTRELAS (nome, tipo, magnitude, id_galaxia) VALUES
('Sol', 'Anã Amarela', -26.74, 1),
('Betelgeuse', 'Supergigante Vermelha', 0.42, 1),
('Sirius', 'Anã Branca', -1.46, 1);

INSERT INTO PLANETA_ELEMENTOS (id_planeta, id_elemento) VALUES
(1, 2), -- Terra -> Oxigênio
(1, 3), -- Terra -> Nitrogênio
(2, 4), -- Marte -> Carbono
(2, 2), -- Marte -> Oxigênio
(3, 1), -- Kepler-186f -> Hidrogênio
(3, 2), -- Kepler-186f -> Oxigênio
(3, 3); -- Kepler-186f -> Nitrogênio

INSERT INTO AGLOMERADOS (nome, tipo, distancia_terra, id_galaxia) VALUES
('Aglomerado das Plêiades', 'Aglomerado Aberto', 444.00, 1),
('Omega Centauri', 'Aglomerado Globular', 15800.00, 1);

INSERT INTO NEBULOSAS (nome, tipo, distancia_terra, id_galaxia) VALUES
('Nebulosa de Órion', 'Nebulosa de Emissão', 1344.00, 1),
('Nebulosa do Caranguejo', 'Restos de Supernova', 6500.00, 1);

INSERT INTO EXOPLANETAS (nome, massa, raio, id_estrela) VALUES
('Kepler-22b', 2.4, 2.35, 3), -- Sirius
('HD 209458 b', 0.69, 1.38, 2); -- Betelgeuse 