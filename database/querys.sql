SELECT P.idPichanga, P.nombre, P.fechaInicio, P.fechaFin, P.lugar, P.precio, P.modoPago, P.idPersona, P.observaciones, 
P.isPrivate, B.nombre as organizador, P.minIntegrantes, P.maxIntegrantes
FROM pichanga P, persona B
WHERE P.idPersona = B.idPersona
AND B.idEmpresa = 1
AND date(P.fechaInicio) <= "2015-06-26" -- fechaFin
AND date(P.fechaFin) >= "2015-06-26"; -- fechaInicio


SELECT A.idPichanga, B.idPersona, B.dni, B.nombre, A.pagoRealizado, A.observaciones 
FROM asistentes A, persona B
WHERE A.idPichanga = 1 AND
	A.idPersona = B.idPersona;

SELECT B.idPersona, A.user, B.dni, B.nombre, C.idEmpresa, B.email,
C.nombre, C.lat, C.lng
FROM login A, persona B, empresa C
WHERE A.user = "123"
AND A.pass = "123"
AND A.user = B.user
AND B.idEmpresa = C.idEmpresa
LIMIT 1;

DELETE FROM pichanga 
WHERE idPichanga = 7;

SELECT idEmpresa, nombre 
FROM empresa;

DELETE FROM asistentes
WHERE idPichanga = 5
AND idPersona = 1;


use pichangamaker;	

select B.email
from asistentes A, persona B
where A.idPichanga = 3
AND A.idPersona = B.idPersona;

INSERT INTO persona (dni, nombre, telefono, idEmpresa, email, user)
VALUES ('123','aefase','123412',1,'123412','11');

select 1;

INSERT INTO login (user, pass)
VALUES ('1234', '1234');

select * from login;

use pichangamaker;

show tables;

select * from connectionhistory;

select * from persona;

select * from chatline;
	
SELECT A.idChatLine, A.fecha, A.texto, A.room, A.idPersona, A.user, A.nombre
FROM (SELECT idChatLine, fecha, texto, room, idPersona, user, nombre
FROM ChatLine
ORDER BY idChatLine DESC
LIMIT 10 ) A
ORDER BY idChatLine ASC;

SELECT idChatLine, fecha, texto, room, idPersona, user, nombre
FROM ChatLine
WHERE fecha < CURRENT_TIMESTAMP() - 1000;

-- WHERE idPersona =  1
-- AND room = 2;

select * from pichanga;
 

INSERT INTO ChatLine (fecha, texto, room, idPersona, user)
VALUES (current_timestamp(), 'Hola amigos', 1, 1, '123');

select date_sub(lastConnection, interval 1 second)
from connectionhistory;

select *
from connectionhistory;

SELECT C.texto as length FROM (SELECT DISTINCT A.idChatLine, A.fecha, A.texto, A.room, A.idPersona, A.user, A.nombre 
FROM chatline A, connectionhistory B
WHERE A.room = 8
AND B.idPichanga = A.room
AND A.fecha > B.lastConnection
AND B.idPersona = 3
AND B.user = 'raul') C;

select fecha 
from chatline
where room = 1
order by 1 ASC
LIMIT 1;

select * from connectionhistory
where idPichanga = 8;

INSERT INTO connectionhistory (idPersona, user, idPichanga, lastConnection) 
VALUES (3, 'raul', 8, (select fecha 
from chatline
where room = 1
order by 1 ASC
LIMIT 1)
 );
 
 select TIMESTAMP('1980-12-08 23:59:59.59');
 

select *
from connectionhistory
where idPichanga = 8;

show tables;