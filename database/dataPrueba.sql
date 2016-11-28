insert into empresa (nombre, lat, lng) values ('Verizon', "-12.1196257", "-77.03739150000001");
insert into empresa (nombre, lat, lng) values ('BCP', "-12.069538270159754", "-76.93689107894897");

insert into login (user,pass, verified, token) values ('123', MD5('123'), True, '');
insert into login (user,pass, verified, token) values ('yeti', MD5('yeti'), true, '');
insert into login (user,pass, verified, token) values ('raul', MD5('raul'), true, '');
insert into login (user,pass, verified, token) values ('jonathan', MD5('jonathan'), true, '');
insert into login (user,pass, verified, token) values ('magyver', MD5('magyver'), true, '');
insert into login (user,pass, verified, token) values ('intruso', MD5('intruso'), true, '');

insert into persona (dni, nombre, telefono, idEmpresa, user, email) values ('72895677', 'Pancho Vilchez', '995434141', 1, '123', 'vilchez.francisco@pucp.pe');
insert into persona (dni, nombre, telefono, idEmpresa, user, email) values ('72895672', 'El Yeti', '995434142',1, 'yeti', 'wilchess26@gmail.com');
insert into persona (dni, nombre, telefono, idEmpresa, user, email) values ('72895673', 'Sr. Raul', '995434143', 1, 'raul', 'wilchess26@gmail.com');
insert into persona (dni, nombre, telefono, idEmpresa, user, email) values ('72895674', 'Jonathan Bastidas', '995434144', 1, 'jonathan', 'wilchess26@gmail.com');
insert into persona (dni, nombre, telefono, idEmpresa, user, email) values ('72895675', 'Magyver', '995434145', 1, 'magyver', 'wilchess26@gmail.com');
insert into persona (dni, nombre, telefono, idEmpresa, user, email) values ('72895676', 'Intruso', '995434145', 2, 'intruso', 'wilchess26@gmail.com');

INSERT INTO pichanga (precio, modoPago, fechaInicio, fechaFin, idPersona, nombre, observaciones, lugar, isPrivate, minIntegrantes, maxIntegrantes, lat, lng) VALUES (10.00, "Efectivo", '2015-07-21 18:00:00.000 ', '2015-07-21 19:00:00.000 ', 1, "Pro-Fondos para comprar tutorial de Reactive", "Pague con sencillo", "Costa Verde", false, 1, 21, "-12.123145334275344", "-77.03988790512085");
INSERT INTO pichanga (precio, modoPago, fechaInicio, fechaFin, idPersona, nombre, observaciones, lugar, isPrivate, minIntegrantes, maxIntegrantes, lat, lng) VALUES (10.00, "Efectivo", '2015-07-22 18:00:00.000 ', '2015-07-22 19:00:00.000 ', 1, "De la Nota", "Pague con sencillo", "Costa Verde", false, 10, 21, "-12.123145334275344", "-77.03988790512085");
INSERT INTO pichanga (precio, modoPago, fechaInicio, fechaFin, idPersona, nombre, observaciones, lugar, isPrivate, minIntegrantes, maxIntegrantes, lat, lng) VALUES (10.00, "Efectivo", '2015-07-22 20:00:00.000 ', '2015-07-22 21:00:00.000 ', 1, "Hackaton", "Pague con sencillo", "Costa Verde", false, 2, 4, "-12.123145334275344", "-77.03988790512085");
INSERT INTO pichanga (precio, modoPago, fechaInicio, fechaFin, idPersona, nombre, observaciones, lugar, isPrivate, minIntegrantes, maxIntegrantes, lat, lng) VALUES (10.00, "Efectivo", '2015-07-23 20:00:00.000 ', '2015-07-23 5:00:00.000 ', 1, "Amanecida", "Pague con sencillo", "Costa Verde", false, 1, 1, "-12.123145334275344", "-77.03988790512085");
INSERT INTO pichanga (precio, modoPago, fechaInicio, fechaFin, idPersona, nombre, observaciones, lugar, isPrivate, minIntegrantes, maxIntegrantes, lat, lng) VALUES (10.00, "Efectivo", '2015-06-26 18:00:00.000 ', '2015-06-26 19:00:00.000 ', 1, "Lejana", "Pague con sencillo", "PUCP", false, 10, 21, "-12.068531067923384", "-77.07836151123047");
INSERT INTO pichanga (precio, modoPago, fechaInicio, fechaFin, idPersona, nombre, observaciones, lugar, isPrivate, minIntegrantes, maxIntegrantes, lat, lng) VALUES (10.00, "Efectivo", '2015-07-26 18:00:00.000 ', '2015-07-26 19:00:00.000 ', 6, "BCPx", "Pague con sencillo", "PUCP", false, 10, 21, "-12.068531067923384", "-77.07836151123047");

insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (1,1, 0, "");
insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (1,2, 0, "");
insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (1,3, 0, "");
insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (1,4, 0, "");
insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (1,5, 0, "");

insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (2,1, 0, "");
insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (2,2, 0, "");
insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (2,3, 0, "");

insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (3,1, 0, "");
-- insert into asistentes (idPichanga, idPersona, pagoRealizado, observaciones) values (3,2, 0, "");