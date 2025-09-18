CREATE TABLE genero (
    id_genero INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    genero VARCHAR (10) NOT NULL
);

CREATE TABLE empleados (
    id_empleados  INTEGER PRIMARY KEY  AUTO_INCREMENT NOT NULL,
    nombre        VARCHAR(15) NOT NULL,
    apellido      VARCHAR(15) NOT NULL,
    edad          INT NOT NULL,
    puesto        INTEGER NOT NULL
);

CREATE TABLE cantidad_talles (
	id_Ctalles	INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	talle	INTEGER NOT NULL
);

CREATE TABLE talles (
	id_talles	INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	id_Ctalles INTEGER NOT NULL,
	FOREIGN KEY(id_Ctalles) REFERENCES cantidad_talles (id_Ctalles)
);

CREATE TABLE shoes (
    id_shoes  INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nombre  VARCHAR(35) NOT  NULL,
    tipo      VARCHAR(20) NOT NULL,
    marca     VARCHAR(15) NOT NULL,
    precio   VARCHAR(15) NOT NULL,
	id_talles   INTEGER NOT NULL,
    FOREIGN KEY(id_talles) REFERENCES talles (id_talles)
);

CREATE TABLE metodoDePago (
	id_metodo	INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	metodo	VARCHAR (20) NOT NULL
);

CREATE TABLE clientes (
	id_cliente INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nombre	 VARCHAR (15) NOT NULL,/*varchar sirve para limitar los caracteres que se van a ingresar*/
	apellido	 VARCHAR (15) NOT NULL, 
	gasto      VARCHAR (10) NOT NULL,
	direccion  VARCHAR (40) NOT NULL,
	email	     VARCHAR (45) NOT NULL UNIQUE,
	numero     VARCHAR (10) NOT NULL UNIQUE,
	id_genero  INTEGER NOT NULL, /*integer es para tener muchos numeros de id ej:12587 id*/
	id_shoes 	 INTEGER NOT NULL,
	id_empleados INTEGER NOT NULL,
    FOREIGN KEY(id_genero) REFERENCES genero(id_genero),
    FOREIGN KEY(id_shoes) REFERENCES shoes(id_shoes),
    FOREIGN KEY(id_empleados) REFERENCES empleados(id_empleados)
);

CREATE TABLE opcionesPago (
	id_pago	INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	id_cliente	INTEGER NOT NULL,
	id_metodo	INTEGER NOT NULL,
	FOREIGN KEY(id_cliente) REFERENCES clientes(id_cliente),
	FOREIGN KEY(id_metodo) REFERENCES metodoDePago(id_metodo)
);


INSERT INTO genero (genero) VALUES
("Mujer"),
("Hombre"),
("Otro");

INSERT INTO empleados (nombre, apellido, puesto, edad) 
VALUES  ('Jose', 'Suarez', 'empleado', '31'),
		('Isabella', 'Sanchez', 'empleado', '29'),
		('Rodrigo', 'Molina', 'empleado', '27'),
		('Natalia', 'Ramos', 'empleado', '28'),
		('Francisco', 'Rodriguez', 'Gerente', '38');

INSERT INTO clientes (nombre, apellido, id_genero, id_shoes, gasto, direccion, email, numero, id_empleados) VALUES
("Graciela", "García", 1, 5, "190.000", "Goleta Sarandí", "g&garcia@gmail.com", "1178534901", 1),
("Marcos", "Gomes", 2, 4, "275.000", "Chilavert 1940", "gomes.m@gmail.com", "1112457809", 2),
("Cecilia", "Lopez", 1, 3, "400.000", "Avenida Nazca", "clopez@gmail.com", "1103912874", 3),
("Julieta", "Centurion", 1, 2, "120.000", "Lisandro de la Torre 991", "jucenturion@gmail.com", "1152344589", 4),
("Pablo", "Hernandez", 3, 1, "160.000", "Avenida Roca", "pabloh@gmail.com", "1140430201", 1),
("Alejandro", "Villa", 2, 6, "110.000", "Avenida Avellaneda", "avilla@gmail.com", "1138296417", 2),
("Belisa", "Mamani", 1, 7, "152.000", "Helguera 4952", "mamamni.bel@gmail.com", "1165056401", 4),
("Brisa", "Miranda", 1, 8, "187.000", "Avenida Roca", "bmiranda@gmail.com", "1136450390", 3),
("Aaron", "Quispe", 2, 9, "143.000", "Cafayate", "aaronquispe@gmail.com", "1124883240", 1),
("Athena", "Vera", 1, 10, "110.000", "Francisco de la Cruz", "athenav@gmail.com", "1127240045", 4),
("Marina", "Aguilar", 1, 11, "130.000", "Bogotá 1234", "aguilarmari@gmail.com", "1153290081", 2),
("Kevin", "Blanco", 2, 6, "110.000", "Borlozano", "kevinb@gmail.com", "1123928809", 1),
("Alex", "Copa", 2, 3, "400.000", "Calle Lisandro", "lexisc@gmail.com", "1154324727", 3),
("Matias", "Balbuena", 3, 1, "160.000", "Campana 3489", "mbalbuena@gmail.com", "1128178795", 4),
("Rocio", "Rocabado", 3, 8, "187.000", "Concordia 1234", "rocabado.ro@gmail.com", "1165405599", 2);

INSERT INTO cantidad_talles (talle) VALUES /*talles aye*/
(34),
(35),
(36),
(37),
(38),
(39),
(40),
(41),
(42),
(43),
(44);

INSERT INTO talles (id_Ctalles) VALUES /*talle aye*/
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11);

INSERT INTO shoes (nombre, tipo, marca, precio, id_talles) 
VALUES  ('dunk Low Retro','basica', 'nike', '$160.000',6),
		('MC trainer','deportivo','nike','$120.000',8),
		('jordan 3 Retro','high-top','nike','$400.000',11),
		('vomero 18','running','nike','$275.000',3),
		('samba OG','basica','adidas','$190.000',2),
		('amplimove','deportiva','adidas','$110.000',7),
		('forum Mid','high-top','adidas','$152.000',9),
		('superNova Rise','running','adidas','$187.000',1),
		('rebound Retro','basica','puma','$143.000',4),
		('darter Pro','deportiva','puma','$110.000',10),
		('carina Mid','high-top','puma','$130.000',5);


INSERT INTO metodoDePago (metodo) VALUES
("Mercado Pago"),
("PayPal");   

INSERT INTO opcionesPago (id_cliente, id_metodo) VALUES
(1,1),
(2,1),
(3,2),
(4,1),
(5,2),
(6,2),
(7,1),
(8,2),
(9,1),
(10,1),
(11,1),
(12,2),
(13,2),
(14,1),
(15,2);
