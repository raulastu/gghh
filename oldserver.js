// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var port = process.env.PORT || 3000;
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  /*host: '173.194.86.41',
  user: 'pancho',
  password: 'root',*/
  database: 'pichangamaker'
});

// var servicehost = "http://162.222.179.98";
var servicehost = "http://localhost";


// https://www.google.com/settings/security/lesssecureapps
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pichangamaker@gmail.com',
    pass: 'Pichanga123'
  }
});

var mailData = {
  minRaized: {
      from: 'PichangaMaker® <pichangamaker@verizon.com>',
      subject: 'Pichanga Confirmed!',
      text: 'The minimum number of players required for the Pichanga was reached ✔'
  },
  deletedPichanga: {
      from: 'PichangaMaker® <pichangamaker@verizon.com>',
      subject: 'Pichanga Canceled',
      text: 'The Pichanga was canceled. We are so sorry'  
  },
  removedFromPichanga: {
      from: 'PichangaMaker® <pichangamaker@verizon.com>',
      subject: 'Removed from Pichanga',
      text: 'You were removed from the Pichanga'    
  },
  activateAccount: {
      from: 'PichangaMaker® <pichangamaker@verizon.com>',
      subject: 'Activate your account',
      text: 'You need to verify that you own this email account'
  },
  createdPichanga: {
      from: 'PichangaMaker® <pichangamaker@verizon.com>',
      subject: 'You are invited to a Pichanga',
      text: 'Confirm your assistance to the Pichanga now!',
      hideassistants: true
    }
}

server.listen(port, function () {
  console.log('Server listening at port %d', port);
  servicehost += ':' + port + '/';
});

// Routing
//app.use(express.static(__dirname + '/public'));
app.use(express.static("../frontend"));
app.use(bodyParser.json()); 


// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ************************************************************** ChatRoom ********************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //


// usernames which are currently connected to the chat
var usernames = {};
var numUsers = {};

io.on('connection', function (socket) {
  var addedUser = false;
  var userInRoom = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.to(socket.room).broadcast.emit('new message', {
      username: socket.username,
      message: data,
      user: socket.user,
      room: socket.room,
      roomName: socket.roomName
    });

    socket.broadcast.emit('notification message', {
      username: socket.username,
      user: socket.user,
      room: socket.room,
      roomName: socket.roomName,
      message: data
    });

    insertMessage(socket.room, socket.idPersona, socket.username, data, socket.user);
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (conData) {
    userInRoom = true;

    // we store the username in the socket session for this client
    socket.username = conData.nombre; //username: Pancho Vilchez
    socket.room = conData.idPichanga;
    socket.idPersona = conData.idPersona;
    socket.user = conData.user; // user: vilchfr
    socket.roomName = conData.nombrePichanga;
    // add the client's username to the global list

    usernames[socket.username] = socket.username;

    socket.join(socket.room);

    if(numUsers[socket.room] == undefined){
      numUsers[socket.room] = 1;
    }
    else{
      ++numUsers[socket.room];
    }

    addedUser = true;

    loadChatHistory(socket.idPersona, socket.room, function(data){

      socket.emit('login', {
        numUsers: numUsers[socket.room],
        history: data
      });

      // echo globally (all clients) that a person has connected
      socket.to(socket.room).broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers[socket.room]
      });

      updateLastConnection(socket.idPersona, socket.user, socket.room);
    });

  });

  socket.on('logoutroom', function(){
    // remove the username from global usernames list
    if (addedUser) {
      userInRoom = false;
      socket.leave(socket.room);
      --numUsers[socket.room];

      updateLastConnection(socket.idPersona, socket.user, socket.room);

      // echo globally that this client has left
      socket.to(socket.room).broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers[socket.room]
      });
    }
  });

  socket.on('typing', function () {
    socket.to(socket.room).broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.to(socket.room).broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  socket.on('logout', function(){
    // remove the username from global usernames list
    if (addedUser) {
      socket.disconnect('unauthorized');
    }
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if(userInRoom){
      socket.leave(socket.room);
      --numUsers[socket.room];

      updateLastConnection(socket.idPersona, socket.user, socket.room);

      // echo globally that this client has left
      socket.to(socket.room).broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers[socket.room]
      });
    }

    if (addedUser) {
      delete usernames[socket.username];
            
      socket.disconnect('unauthorized');
    }
  });
});


// DataBase Interaction

function updateLastConnection(idPersona, user, idRoom){
  pool.getConnection(function(err, connection) {
    connection.query(' SELECT count(*) as length' +
                     ' FROM connectionhistory ' +
                     ' WHERE idPersona = ? ' +
                     ' AND user = ? ' +
                     ' AND idPichanga = ? ', [idPersona, user, idRoom], function(err, rows) {
      if (err) {  
        console.log(err);
      }
      else{
        if (rows[0].length){
          connection.query(' UPDATE connectionhistory ' +
                           ' SET lastConnection = current_timestamp() ' +
                           ' WHERE idPersona = ? ' +
                           ' AND user = ? ' +
                           ' AND idPichanga = ? ', [idPersona, user, idRoom], function(err, rows) {
            if (err) {  
              console.log(err);
            }
          });
        }
        else{
          connection.query(' INSERT INTO connectionhistory (idPersona, user, idPichanga, lastConnection) ' +
                           ' VALUES (?, ?, ?, current_timestamp() ) ', [idPersona, user, idRoom], function(err, rows) {
            if (err) {  
              console.log(err);
            }
          });
        }
      }
      connection.release();
    });
  });
}

function loadChatHistory(idPersona, idRoom, callback){

  pool.getConnection(function(err, connection) {
    connection.query(' SELECT DISTINCT A.idChatLine, A.fecha, A.texto, A.room, A.idPersona, A.user, A.nombre, (A.fecha <= B.lastConnection) as leido ' +
                     ' FROM chatline A, connectionhistory B ' +
                     ' WHERE A.room = ? ' +
                     ' AND B.idPichanga = A.room ' +
                     ' AND B.idPersona = ? ', [idRoom, idPersona], function(err, rows) {
      if (err) {  
        console.log(err);
      }
      else{
        if (typeof(callback) == 'function'){
          callback(rows);
        }
      }
      connection.release();
    });
  });
}

function insertMessage(room, idPersona, nombre, message, user){
  pool.getConnection(function(err, connection) {
    connection.query(' INSERT INTO chatline (fecha, texto, room, idPersona, user, nombre) ' +
                     ' VALUES (current_timestamp(), ?, ?, ?, ?, ?) ' , [message, room, idPersona, user, nombre], function(err, rows) {
      if (err) {  
        console.log(err);
      }
      connection.release();
    });
  });
}


// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// *********************************************************** Web Services ******************************************************************************** //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //
// ********************************************************************************************************************************************************* //



app.all('/*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", false);
    res.header("Access-Control-Max-Age", '86400'); // 24 hours
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

app.get('/cantmensajes', function(req, res){
    res.header("Content-Type", "application/json");

    pool.getConnection(function(err, connection){

        connection.query(' SELECT count(*) as length' +
                         ' FROM connectionhistory ' +
                         ' WHERE idPersona = ? ' +
                         ' AND user = ? ' +
                         ' AND idPichanga = ? ', [req.query.idPersona, req.query.user, req.query.idRoom], function(err, rows) {
          if (err) {  
            res.send(err);
          }
          else{
            if (!rows[0].length){

              connection.query(' INSERT INTO connectionhistory (idPersona, user, idPichanga, lastConnection) ' +
                               ' VALUES (?, ?, ?, TIMESTAMP("1980-12-08 23:59:59.59") ) ', [req.query.idPersona, req.query.user, req.query.idRoom], function(err, rows) {

                if (err) {  
                  console.log(err);
                }
                else{

                  connection.query(' SELECT count(C.texto) as length FROM (SELECT DISTINCT A.idChatLine, A.fecha, A.texto, A.room, A.idPersona, A.user, A.nombre ' +
                               ' FROM chatline A, connectionhistory B ' +
                               ' WHERE A.room = ? ' +
                               ' AND B.idPichanga = A.room ' +
                               ' AND A.fecha > B.lastConnection ' +
                               ' AND B.idPersona = ? ' +
                               ' AND B.user = ?) C ', [req.query.idRoom, req.query.idPersona, req.query.user], function(err, rows) {
                    if (err) {
                        res.send(err);
                    } 
                    else {
                        res.send({data: rows[0].length});
                    }
                  });

                }
              });
            }
            else{

              connection.query(' SELECT count(C.texto) as length FROM (SELECT DISTINCT A.idChatLine, A.fecha, A.texto, A.room, A.idPersona, A.user, A.nombre ' +
                               ' FROM chatline A, connectionhistory B ' +
                               ' WHERE A.room = ? ' +
                               ' AND B.idPichanga = A.room ' +
                               ' AND A.fecha > B.lastConnection ' +
                               ' AND B.idPersona = ? ' +
                               ' AND B.user = ?) C ', [req.query.idRoom, req.query.idPersona, req.query.user], function(err, rows) {
                if (err) {
                    res.send(err);
                } 
                else {
                    res.send({data: rows[0].length});
                }
              });

            }
          }
          connection.release();
        });
    });

});

app.get('/pichangas', function(req, res) {
    res.header("Content-Type", "application/json");
    
    pool.getConnection(function(err, connection) {
        connection.query('  SELECT P.idPichanga, P.nombre, P.fechaInicio, P.fechaFin, P.lugar, P.precio, P.modoPago, P.idPersona, P.observaciones, ' + 
                         '  P.isPrivate, B.nombre as organizador, P.minIntegrantes, P.maxIntegrantes, P.lat, P.lng ' +
                         '  FROM pichanga P, persona B ' +
                         '  WHERE P.idPersona = B.idPersona ' +
                         '  AND B.idEmpresa = ? ' + 
                         '  AND date(P.fechaInicio) <= ? ' +
                         '  AND date(P.fechaFin) >= ? ' , [req.query.idEmpresa, req.query.endDate, req.query.startDate], function(err, rows) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({data : rows});
            }
            connection.release();
        });
    });
});

app.post('/pichangas', function(req, res){
    res.header("Content-Type", "application/json");

    var query = ' SELECT B.email, B.nombre FROM persona B ';

    pool.getConnection(function(err, connection){
        connection.query('  INSERT INTO pichanga (precio, modoPago, fechaInicio, fechaFin, idPersona, nombre, ' +
                         '  observaciones, lugar, isPrivate, minIntegrantes, maxIntegrantes, lat, lng) VALUES ' +
                         '  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ' , [req.body.precio, req.body.modoPago, 
                         req.body.fechaInicio, req.body.fechaFin, req.body.idPersona, 
                         req.body.nombre, req.body.observaciones, req.body.lugar, 
                         req.body.isPrivate, req.body.minIntegrantes, req.body.maxIntegrantes, req.body.lat, req.body.lng], function(err, rows) {
            if (err) { 
               res.send(err);
            }
            else{

                res.send({data: []});

                mailPichangaInvited(req.body, mailData.createdPichanga, query);
            }

            connection.release();
        });
    });
});

app.delete('/pichangas', function(req, res){
    res.header("Content-Type", "application/json");
    pool.getConnection(function(err, connection){

        var query = ' SELECT B.email, B.nombre FROM asistentes A, persona B WHERE A.idPichanga = ? AND A.idPersona = B.idPersona ';

        mailPichangaRelated(req.body, mailData.deletedPichanga, query, function(respuesta){

            console.log("Message sent: " + respuesta.response);

            connection.query('  DELETE FROM asistentes WHERE idPichanga = ? ', [req.body.idPichanga], function(err, rows) {
                if (err) { 
                    console.log(err);
                    res.send(err);
                }
                else{

                  connection.query('  DELETE FROM connectionhistory WHERE idPichanga = ? ', [req.body.idPichanga], function(err, rows) {
                    if (err) { 
                        console.log(err);
                        res.send(err);
                    }
                    else{
                      connection.query('  DELETE FROM chatline WHERE room = ? ', [req.body.idPichanga], function(err, rows) {
                        if (err) { 
                            console.log(err);
                            res.send(err);
                        }
                        else{
                          connection.query('  DELETE FROM pichanga WHERE idPichanga = ? ', [req.body.idPichanga], function(err, rows) {
                            if (err) { 
                                console.log(err);
                                res.send(err);
                            }
                            else{
                                res.send({data: []});
                            }                            
                          });                          
                        }
                      });
                    }
                  });
                }
            });
            connection.release();
        });
        
    });
});

app.get('/asistentes', function(req, res){
    res.header("Content-Type", "application/json");

    pool.getConnection(function(err, connection){
        connection.query('  SELECT A.idPichanga, B.idPersona, B.dni, B.nombre, B.telefono, B.email, A.pagoRealizado, A.observaciones ' +
                         '  FROM asistentes A, persona B ' +
                         '  WHERE A.idPichanga = ? AND ' +
                         '  A.idPersona = B.idPersona ', [req.query.pichanga], function(err, rows) {

            if (err) { 
                res.send(err);
            } 
            else {
                res.send({data: rows});
            }
            connection.release();
        });
    });
});

app.post('/asistentes', function(req, res){
    res.header("Content-Type", "application/json");

    console.log(req.body);

    pool.getConnection(function(err, connection){
        connection.query('  INSERT INTO asistentes (idPichanga, idPersona, pagoRealizado, observaciones) ' +
                         '  VALUES (?, ?, ?, ?) ', [req.body.idPichanga, req.body.idPersona, 
                         req.body.pagoRealizado, req.body.observaciones], function(err, rows) {
            if (err) { 
               res.send(err);
            }
            else{
              res.send({data: rows});

              if(req.body.minIntegrantes == (req.body.cantInscritos + 1)){

                  var query = ' SELECT B.email, B.nombre FROM asistentes A, persona B WHERE A.idPichanga = ? AND A.idPersona = B.idPersona ';

                  mailPichangaRelated(req.body, mailData.minRaized, query, function(respuesta){
                      console.log("Message sent: " + respuesta.response);
                  });
              }                
            }
            connection.release();
        });
    });
});

app.delete('/asistentes', function(req, res){
    res.header("Content-Type", "application/json");
    pool.getConnection(function(err, connection){

        var query = ' SELECT B.email, B.nombre FROM asistentes A, persona B WHERE A.idPichanga = ? AND A.idPersona = B.idPersona AND A.idPersona = ? ';

        mailPichangaRelated(req.body, mailData.removedFromPichanga, query, function(respuesta){

            console.log("Message sent: " + respuesta.response);

            connection.query('  DELETE FROM asistentes WHERE idPichanga = ? AND idPersona = ? '
                             , [req.body.idPichanga, req.body.idPersona], function(err, rows) {
                if (err) { 
                   res.send(err);
                }
                else{
                    res.send({data: []});
                }
                connection.release();
            });

        });


    });
});

app.get('/quickconfirm', function(req, res){
    res.header("Content-Type", "application/json");

    console.log(req.query);

    /*pool.getConnection(function(err, connection){
        connection.query('  INSERT INTO asistentes (idPichanga, idPersona, pagoRealizado, observaciones) ' +
                         '  VALUES (?, ?, ?, ?) ', [req.query.idPichanga, req.query.idPersona, 
                            0, "Confirmed"], function(err, rows) {
            if (err) { 
               res.send(err);
            }
            else{
              res.send({data: rows});

              if(req.body.minIntegrantes == (req.body.cantInscritos + 1)){

                  var query = ' SELECT B.email, B.nombre FROM asistentes A, persona B WHERE A.idPichanga = ? AND A.idPersona = B.idPersona ';

                  mailPichangaRelated(req.body, mailData.minRaized, query, function(respuesta){
                      console.log("Message sent: " + respuesta.response);
                  });
              }    

            }
            connection.release();
        });
    });*/
});

app.get('/login', function(req, res){
    res.header("Content-Type", "application/json");
    pool.getConnection(function(err, connection){
        connection.query('  SELECT B.idPersona, A.user, B.dni, B.nombre, C.idEmpresa, B.email, ' +
                         '  C.nombre as nombreEmpresa, C.lat, C.lng, A.pass ' +
                         '  FROM login A, persona B, empresa C ' +
                         '  WHERE A.user = ? ' +
                         '  AND A.pass = MD5(?) ' +
                         '  AND A.user = B.user ' +
                         '  AND B.idEmpresa = C.idEmpresa ' +
                         '  AND A.verified = TRUE ' +
                         '  LIMIT 1 ', [req.query.user, req.query.pass], function(err, rows) {
            if (err) { 
               res.send(err);
            } 
            else {
                res.send({data: rows});
            }
            connection.release();
        });

    });
});

app.get('/verifymail', function(req, res){
    res.header("Content-Type", "application/json");
    pool.getConnection(function(err, connection){
        connection.query('  UPDATE login ' +
                         '  SET verified = TRUE ' +
                         '  WHERE token = ? ', [req.query.token], function(err, rows) {
            if (err) { 
                res.send(err);
            } 
            else {
                res.send("Su usuario se ha activado");
            }
            connection.release();
        });

    });
});


app.get('/empresas', function(req, res){
    res.header("Content-Type", "application/json");
    pool.getConnection(function(err, connection){
        connection.query('  SELECT idEmpresa, nombre, lat, lng FROM empresa ', 
                            function(err, rows) {
            if (err) {
               res.send(err);
            } 
            else {
                res.send({data: rows});
            }
            connection.release();
        });

    });
});

app.post('/personas', function(req, res){
    res.header("Content-Type", "application/json");
    pool.getConnection(function(err, connection){

        var token = "";
        var user = req.body.user;

        for(var i = 0; i < user.length; i++){
            token += user.charCodeAt(i).toString(16);
        }

        connection.query('  INSERT INTO login (user, pass, verified, token) ' +
                         '  VALUES (?, MD5(?), ?, ?) ', [req.body.user, req.body.pass, false, token], function(err, rows) {
            if (err) { 
               res.send({
                    err: err,
                    me: "Seleccione otro usuario"
               })
            }
            else{

                connection.query('  INSERT INTO persona (dni, nombre, telefono, idEmpresa, email, user) ' +
                                 '  VALUES (?, ?, ?, ?, ?, ?) ', [req.body.dni, req.body.nombre, req.body.telefono,
                                    req.body.idEmpresa, req.body.email, req.body.user] , function(err, rows) {
                    if (err) { 
                        res.send({
                            err : err,
                            me: "Error en INSERT persona"
                        });     
                    }
                    else{
                        sendMailActivateAccount(req.body, token, mailData.activateAccount);

                        res.send({
                            data: rows,
                            me: ""
                        });
                    }            
                });

            }            
        });

        connection.release();
    });
});

function sendMailActivateAccount(info, token, mailObject){
    
    var link = servicehost + "verifymail?token=" + token;
    
    var sendText = "<html>Dear User " + info.nombre + "<br/><br/>";
    sendText += mailObject.text + "<br/><br/>";
    sendText += "Please go to the next link to verify the following user: <strong>" + info.user + "</strong><br/><br/>";
    sendText += link;

    sendText += "</html>";

    var mailOptions = {
        from: mailObject.from,
        to: info.email,
        subject: mailObject.subject,
        html: sendText 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error);
        }
        else {
            console.log('Message sent: ' + info.response);
        }
    });
}

function mailPichangaInvited(infoUtil, mailObject, query){
    console.log('mailLog: ' + mailObject.text);
    pool.getConnection(function(err, connection){
        connection.query( query , [infoUtil.idPichanga, infoUtil.idPersona], function(err, rows) {

            if (err) { 
                console.log(err);
            } 
            else {

                if(rows.length){

                  var sendText = "<html>" + mailObject.text + "<br/><br/>";
                  sendText += "The organizator will contact you to tell about the details<br/><br/>";
                  sendText += "Pichanga: " + infoUtil.title + "<br/><br/>";
                  sendText += "Organizer: " + infoUtil.organizador + "<br/><br/>";
                  sendText += "Costo: S/." + infoUtil.costo + "<br/><br/>";
            
                  sendText += "Invited to the Pichanga<br/>";
                  sendText += "<ul>";
                  var mailArray = [];
                  for (var i = 0; i < rows.length; i++){
                    mailArray.push(rows[i].email);
                    sendText += "<li>" + rows[i].nombre + "</li>";
                  }
                  sendText += "</ul><br/>";                    

                  var toMails = mailArray.toString();

                  sendText += "Thanks!!<br/><br/>";

                  sendText += "PichangaMaker®</html>";

                  console.log("Sending [" + mailArray.length+ "] massive invitation mails");

                  for (var i = 0; i < mailArray.length; i++){

                    var mailOptions = {
                      from: mailObject.from, // sender address 
                      to: mailArray[i],
                      subject: mailObject.subject, // Subject line 
                      html: sendText // plaintext body 
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                      if(error){
                        console.log(error);
                      }else{
                        console.log('Message sent: ' + info.response);
                      }
                    });
                  }
                }
                else{
                  console.log("No users affected");
                }
            }
            connection.release();
        });
    });
    return ;
}


function mailPichangaRelated(infoUtil, mailObject, query, callback){
    console.log('mailLog: ' + mailObject.text);
    pool.getConnection(function(err, connection){
        connection.query( query , [infoUtil.idPichanga, infoUtil.idPersona], function(err, rows) {

            if (err) { 
                if (typeof(callback) == "function"){
                    callback(err);
                }
            } 
            else {

                if(rows.length){

                    var sendText = "<html>" + mailObject.text + "<br/><br/>";
                    sendText += "The organizator will contact you to tell about the details<br/><br/>";
                    sendText += "Pichanga: " + infoUtil.title + "<br/><br/>";
                    sendText += "Organizer: " + infoUtil.organizador + "<br/><br/>";
                    sendText += "Costo: S/." + infoUtil.costo + "<br/><br/>";

                    sendText += "Confirmed Assistants to the Pichanga<br/>";
                    sendText += "<ul>";
                    var mailArray = [];
                    for (i = 0; i < rows.length; i++){
                        mailArray.push(rows[i].email);
                        sendText += "<li>" + rows[i].nombre + "</li>";
                    }
                    sendText += "</ul><br/>";                    

                    var toMails = mailArray.toString();

                    sendText += "Thanks!!<br/><br/>";

                    sendText += "PichangaMaker®</html>";

                    var mailOptions = {
                        from: mailObject.from, // sender address 
                        to: toMails, // list of receivers 
                        subject: mailObject.subject, // Subject line 
                        html: sendText // plaintext body 
                    };
                     
                    // send mail with defined transport object 
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            if (typeof(callback) == "function"){
                                callback(error);
                            }
                        }else{
                            //console.log('Message sent: ' + info.response);
                            if (typeof(callback) == "function"){
                                callback(info);
                            }
                        }
                    });

                }
                else{
                    if (typeof(callback) == "function"){
                        callback({response: "No users affected"});
                    }
                }
            }
            connection.release();
        });
    });
    return ;
}

app.get('/cantmensajes', function(req, res){
    res.header("Content-Type", "application/json");

    pool.getConnection(function(err, connection){

        connection.query(' SELECT count(*) as length' +
                         ' FROM connectionhistory ' +
                         ' WHERE idPersona = ? ' +
                         ' AND user = ? ' +
                         ' AND idPichanga = ? ', [req.query.idPersona, req.query.user, req.query.idRoom], function(err, rows) {
          if (err) {  
            res.send(err);
          }
          else{
            if (!rows[0].length){

              connection.query(' INSERT INTO connectionhistory (idPersona, user, idPichanga, lastConnection) ' +
                               ' VALUES (?, ?, ?, TIMESTAMP("1980-12-08 23:59:59.59") ) ', [req.query.idPersona, req.query.user, req.query.idRoom], function(err, rows) {

                if (err) {  
                  console.log(err);
                }
                else{

                  connection.query(' SELECT count(C.texto) as length FROM (SELECT DISTINCT A.idChatLine, A.fecha, A.texto, A.room, A.idPersona, A.user, A.nombre ' +
                               ' FROM chatline A, connectionhistory B ' +
                               ' WHERE A.room = ? ' +
                               ' AND B.idPichanga = A.room ' +
                               ' AND A.fecha > B.lastConnection ' +
                               ' AND B.idPersona = ? ' +
                               ' AND B.user = ?) C ', [req.query.idRoom, req.query.idPersona, req.query.user], function(err, rows) {
                    if (err) {
                        res.send(err);
                    } 
                    else {
                        res.send({data: rows[0].length});
                    }
                  });

                }
              });
            }
            else{

              connection.query(' SELECT count(C.texto) as length FROM (SELECT DISTINCT A.idChatLine, A.fecha, A.texto, A.room, A.idPersona, A.user, A.nombre ' +
                               ' FROM chatline A, connectionhistory B ' +
                               ' WHERE A.room = ? ' +
                               ' AND B.idPichanga = A.room ' +
                               ' AND A.fecha > B.lastConnection ' +
                               ' AND B.idPersona = ? ' +
                               ' AND B.user = ?) C ', [req.query.idRoom, req.query.idPersona, req.query.user], function(err, rows) {
                if (err) {
                    res.send(err);
                } 
                else {
                    res.send({data: rows[0].length});
                }
              });

            }
          }
          connection.release();
        });
    });

});
