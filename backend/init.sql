CREATE DATABASE IF NOT EXISTS astro_db;
USE astro_db;

-- Criação da tabela GALAXIAS 
CREATE TABLE GALAXIAS (
 id_galaxia INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL UNIQUE,
 tipo VARCHAR(50),
 distancia_terra DECIMAL(20,4)
);

-- Criação da tabela PLANETAS 
CREATE TABLE PLANETAS (
 id_planeta INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 gravidade DECIMAL(10,4),
 habitavel BOOLEAN NOT NULL,
 id_galaxia INT NOT NULL,
 FOREIGN KEY (id_galaxia) REFERENCES GALAXIAS(id_galaxia)
);

-- Criação da tabela ELEMENTOS 
CREATE TABLE ELEMENTOS (
 id_elemento INT AUTO_INCREMENT PRIMARY KEY,
 nome_elemento VARCHAR(50) NOT NULL UNIQUE,
 sigla_elemento VARCHAR(3) NOT NULL UNIQUE
);

-- Criação da tabela de associação PLANETA_ELEMENTOS 
CREATE TABLE PLANETA_ELEMENTOS (
 id_planeta INT,
 id_elemento INT,
 PRIMARY KEY (id_planeta, id_elemento),
 FOREIGN KEY (id_planeta) REFERENCES PLANETAS(id_planeta),
 FOREIGN KEY (id_elemento) REFERENCES ELEMENTOS(id_elemento)
);

-- Criação da tabela ESTRELAS 
CREATE TABLE ESTRELAS (
 id_estrela INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL UNIQUE,
 tipo VARCHAR(50),
 magnitude DECIMAL(5,2),
 id_galaxia INT NOT NULL,
 FOREIGN KEY (id_galaxia) REFERENCES GALAXIAS(id_galaxia)
);

-- Criação da tabela AGLOMERADOS 
CREATE TABLE AGLOMERADOS (
 id_aglomerado INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL UNIQUE,
 tipo VARCHAR(50),
 distancia_terra DECIMAL(20,4),
 id_galaxia INT NOT NULL,
 FOREIGN KEY (id_galaxia) REFERENCES GALAXIAS(id_galaxia)
);

-- Criação da tabela NEBULOSAS 
CREATE TABLE NEBULOSAS (
 id_nebulosa INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL UNIQUE,
 tipo VARCHAR(50),
 distancia_terra DECIMAL(20,4),
 id_galaxia INT NOT NULL,
 FOREIGN KEY (id_galaxia) REFERENCES GALAXIAS(id_galaxia)
);

-- Criação da tabela EXOPLANETAS 
CREATE TABLE EXOPLANETAS (
 id_exoplaneta INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 massa DECIMAL(10,4),
 raio DECIMAL(10,4),
 id_estrela INT NOT NULL,
 FOREIGN KEY (id_estrela) REFERENCES ESTRELAS(id_estrela)
);

-- Inserção de dados na tabela GALAXIAS 
INSERT INTO GALAXIAS (nome, tipo, distancia_terra) VALUES
('Via Láctea', 'Espiral Barrada', 0.00),
('Andrômeda', 'Espiral', 2537000.00),
('Galáxia do Triângulo', 'Espiral', 3000000.00);

-- Inserção de dados na tabela ELEMENTOS 
INSERT INTO ELEMENTOS (nome_elemento, sigla_elemento) VALUES
('Hidrogênio', 'H'),
('Oxigênio', 'O'),
('Nitrogênio', 'N'),
('Carbono', 'C'),
('Hélio', 'He');

-- Inserção de dados na tabela PLANETAS 
INSERT INTO PLANETAS (nome, gravidade, habitavel, id_galaxia) VALUES
('Terra', 9.81, true, 1),
('Marte', 3.72, false, 1),
('Kepler-186f', 11.0, true, 1),
('Proxima Centauri b', 10.8, true, 1);

-- Inserção de dados na tabela ESTRELAS 
INSERT INTO ESTRELAS (nome, tipo, magnitude, id_galaxia) VALUES
('Sol', 'Anã Amarela', -26.74, 1),
('Betelgeuse', 'Supergigante Vermelha', 0.42, 1),
('Sirius', 'Anã Branca', -1.46, 1);

-- Inserção de dados na tabela PLANETA_ELEMENTOS 
INSERT INTO PLANETA_ELEMENTOS (id_planeta, id_elemento) VALUES
(1, 2), -- Terra -> Oxigênio
(1, 3), -- Terra -> Nitrogênio
(2, 4), -- Marte -> Carbono
(2, 2), -- Marte -> Oxigênio
(3, 1), -- Kepler-186f -> Hidrogênio
(3, 2), -- Kepler-186f -> Oxigênio
(3, 3); -- Kepler-186f -> Nitrogênio

-- Inserção de dados na tabela AGLOMERADOS 
INSERT INTO AGLOMERADOS (nome, tipo, distancia_terra, id_galaxia) VALUES
('Aglomerado das Plêiades', 'Aglomerado Aberto', 444.00, 1),
('Omega Centauri', 'Aglomerado Globular', 15800.00, 1);

-- Inserção de dados na tabela NEBULOSAS 
INSERT INTO NEBULOSAS (nome, tipo, distancia_terra, id_galaxia) VALUES
('Nebulosa de Órion', 'Nebulosa de Emissão', 1344.00, 1),
('Nebulosa do Caranguejo', 'Restos de Supernova', 6500.00, 1);

-- Inserção de dados na tabela EXOPLANETAS 
INSERT INTO EXOPLANETAS (nome, massa, raio, id_estrela) VALUES
('Kepler-22b', 2.4, 2.35, 3), -- Sirius
('HD 209458 b', 0.69, 1.38, 2); -- Betelgeuse