
//  change to trigger deploy v27 - go nano

// Setup basic express server
var express = require('express');
var request = require('request');
var app = express();
var useragent = require('express-useragent');
var multer  = require('multer')
var AWS = require('aws-sdk');
var moment = require('moment');

var winston = require('winston'),
	expressWinston = require('express-winston');

AWS.config.update({accessKeyId: 'AKIAJ4JVZNLZHTFJOJMQ', secretAccessKey: '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'});
//AWS.config.update({httpOptions: {timeout:20000}});

var upload = multer({ dest: 'upload/' })
var fs = require('fs')


var awsS3Upload= require('s3-uploader');

var logging = require('./lib/logging');
var firebase = require('firebase');

app.use(logging.requestLogger);

logging.log("xloggin winston");

global.userId='anon';

console.log=(function() {
	var orig=console.log;
	return function() {
		try {
			var tmp=process.stdout;
			process.stdout=process.stderr;
			if(global.userId){
				arguments = Array.prototype.concat.apply([global.userId],arguments);
			}
			orig.apply(console, arguments);
		} finally {
			process.stdout=tmp;
		}
	};
})();

app.use(useragent.express());

//var routesArray = ['/login', '/pichangas', '/signup', '/email', '/chPassW', '/logout', '/snapshot'];


// app.use(express.session({secret: '1234567890QWERTY'}));

//sessionStore =
//app.use express.session secret: 'key', store: sessionStore

//resave: false,
//    saveUninitialized: true

firebase.initializeApp({
	serviceAccount: "pichangamaker-6da38dd1072e.json",
	databaseURL: "https://pichangamaker-1d2e6.firebaseio.com/"
});
ref = firebase.database().ref();

function userAuthentication(req, res, next){
	console.log(req.session);
	logging.log("xloggin winston");
	if ('loggedInUser' in req.session ){
		next();
	}else{
		res.send(401, {"error":"User not logged in"} );
	}
}


// ,
//     cookie: {path:'/pichangas'},
//     saveUninitialized: false,
//     resave: false,
//     rolling: true



var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//app.use(bodyParser.raw({limit: '50mb',
//	verify:function(req,res,buf){
//
//		console.log('raul')
//		console.log(buf)
//		req.rawBody=buf
//	}
//
//}));




var nodemailer = require('nodemailer');
var port = process.env.PORT || 3001;
var mysql = require('mysql');

var jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');

var jwtSecret = 'shhhhhh';

var dbOptions = {
	// host: 'localhost',
	// user: 'root',
	// password: '1234',

	host: 'pichangamaker-instance.cmciagszhbai.us-west-2.rds.amazonaws.com',
	user: 'root',
	password: 'pichanger',
	/*
	 host: '173.194.86.41',
	 user: 'root',
	 password: 'root',*/
	database: 'pichangamaker'
};

var pool = mysql.createPool(dbOptions);




var session = require('express-session');
var cookieParser = require('cookie-parser');
var SessionStore = require('express-mysql-session');

var sessionConnection = mysql.createConnection(dbOptions);
var sessionStore = new SessionStore({}, sessionConnection );

app.use(cookieParser());
app.use(session(
	{
		secret: 'picham',
		saveUninitialized: true,
		store: sessionStore,
		resave: true,
		rolling: true
	}
));


var rest = require('rest')

//var Parse = require('parse').Parse;
//Parse.initialize(parseAppId, parseJSKey);

var parseUrl = "https://api.parse.com/1"
var parseAppId = "v4FbuD3PzjPk9km3ZitzOGPTnkpft3R0Z6M4pvF4"
var parseRestApiKey = "lwlOefH7OTLpldS9eYSx5xj0MNYRbEP2zoQKoVgA"
var parseMasterKey = "YJgvhNA6A1TD5B5Saur6EHwbfGcVIEawDRubxkBz"
var parseJSKey = "8eC72p37EQwlmXXANT1I7sCDhL8XggFKPhS5VX6o";




// var servicehost = "http://pm-elb-101114421.us-east-1.elb.amazonaws.com:3000";
var servicehost = "http://localhost:3001/";
var website = "http://pichangamaker.com/";


// https://www.google.com/settings/security/lesssecureapps
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'pichangamaker@gmail.com',
		pass: 'Pichanga123'
	}
});

var error_messages_en = {
	incorrect_login: 'Wrong email or password',
	account_not_verified: 'Please verify your account. Check also the spam folder.',
	invalid_user: 'User already exists. Please choose another user',
	incorrect_message: 'Message could not be sent'
}

var error_messages = {
	incorrect_login: 'email o password incorrectos',
	account_not_verified: 'Please verify your account. Check also the spam folder.',
	invalid_user: 'Usuario ya existe. Porfavor ingresa un email diferente',
	incorrect_message: 'Message could not be sent'
}

var info_messages = {
	user_activated: 'Your user has been activated.'
}

var success_messages = {
	pichanga_created: 'The pichanga was created!',
	pichanga_deleted: 'The pichanga was canceled',
	assistant_deleted: 'Usuario fue removido',
	user_created: 'Usuario Registrado'
}

var success_messages_en = {
	pichanga_created: 'The pichanga was created!',
	pichanga_deleted: 'The pichanga was canceled',
	assistant_deleted: 'The user was removed',
	user_created: 'The user was created'
}


var WORLD_CREATION_DATETIME = "1980-12-08 23:59:59.59";

server.listen(port, function () {
	console.log('Server listening at port %d', port);
	// servicehost += ':' + port + '/';
});

// Routing
//app.use(express.static(__dirname + '/public'));
app.use(express.static("../frontend"));
//app.use(bodyParser.json());


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
var user_data = []; // data of the users
var user_room_count = {}; // users count per room

console.log('running socket');


// Get user info
var users = require('./users.js')(pool);
var installation = require('./installation.js')(pool);
var chat = require('./chat.js')(pool);
var crew = require('./crew.js')(pool);
var place = require('./place.js')(pool);
var pichanga = require('./pichanga.js')(pool);
var mail = require('./mail.js')(pool, transporter);
var push = require('./push_utils.js')(pool);
var layer = require('./layer.js')();
var gateKeeper = require('./gatekeeper.js')(pool);


var jsrsasign = require('jsrsasign');


//var adminRoutes = require('./routes/admin.js');

var user_online = 0;

var sockets = [];

var users_connected = {};

//require('./routes')(app);


io.set('authorization', socketioJwt.authorize({
  secret: jwtSecret,
  handshake: true
}));


io.on('connection', function(socket){
	console.log('*** Socket connection successful ***');

	var socketUser = jwt.verify(socket.handshake.query.token, jwtSecret);
	// console.log('User in socket', socketUser);

	users_connected[socketUser.person_id] = users_connected[socketUser.person_id] || {};
	users_connected[socketUser.person_id].name = socketUser.name;

	pichanga.getActivePichangas(socketUser.person_id, function(data){
		console.log('Authenticated!!', socketUser.name);

		users_connected[socketUser.person_id].channels = [];


		data.forEach(function(el, e){
			socket.join(el.pichanga_id);
			users_connected[socketUser.person_id].channels.push(el.pichanga_id);
		});

		socket.emit('authenticated', {
			active_pichangas: data
		});
	});


	socket.on('new message', function(data){

	});

	socket.on('logout', function(){
		socket.disconnect('unauthorized');
	});

	socket.on('disconnect', function(){

	});

});


app.get('/chatusers', function(req, res){
	res.send(users_connected);
})



app.post('/connectionhistory', function(req, res){
	res.header("Content-Type", "application/json");
	pool.getConnection(function(err, connection) {
		connection.query( 	' INSERT INTO connection_history (room_id, person_id, last_connection) ' +
							' VALUES (?, ?, current_timestamp() ) ' +
							' ON DUPLICATE KEY UPDATE ' +
							' last_connection = current_timestamp() ', [req.body.room_id, req.body.person_id], function(err, rows) {
			if (err) {
				res.send({
					error: err,
					me: err
				});
			}
			else{
				console.log(rows);
				res.send({data: rows})
			}
		});
		connection.release();
	});
});

app.get('/message/all/history', function(req, res){
	// res.header("Content-Type", "application/json");
	pool.getConnection(function(err, connection) {
		connection.query( 	' SELECT A.room_id, A.person_id, A.message, A.sent_date, (A.sent_date < B.last_connection) as seen, P.name, P.email ' +
							' FROM chat_line A, ( ' +
							'   SELECT ( IF (count(*)=0, ?, last_connection) ) as last_connection ' +
							'   FROM connection_history ' +
							'   WHERE room_id = ? ' +
							'   AND person_id = ? ) B, person P ' +
							' WHERE A.room_id = ? ' +
							' AND A.person_id = P.person_id ', [WORLD_CREATION_DATETIME, req.query.room_id, req.query.person_id, req.query.room_id], function(err, rows) {
			if (err) {
				res.send({
					error: err,
					me: err
				});
			}
			else{
				res.send({data: rows})
			}
		});
		connection.release();
	});
});

app.post('/message', function(req, res){
	res.header("Content-Type", "application/json");
	pool.getConnection(function(err, connection) {
		connection.query(' INSERT INTO chat_line (sent_date, message, room_id, person_id) ' +
										 ' VALUES (current_timestamp(), ?, ?, ?) ' , [req.body.message, req.body.room_id, req.body.person_id], function(err, rows) {
			if (err) {
				res.send({
					error: err,
					me: err
				});
			}
			else{
				res.send({data: rows})
			}
		});
		connection.release();
	});
});

var Converter = require("csvtojson").Converter;

var username = "hackathon";
var password = "a1SL!HV0";
var url = "https://hackathon1.smartconservationtools.org:8443/server/api/query/";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


//record_parsed will be emitted each csv row being processed 
// converter.on("record_parsed", function (jsonObj) {
// 	console.log('on record_parsed')
//    console.log(jsonObj); //here is your result json object 
// });
 

var rRes = {}
// converter.on("end_parsed", function (jsonObj) {
// 	console.log('on end_parsed')
// 	// console.log(jsonObj); //here is your result json object 
// 	// rRes.send(jsonObj)
// 	console.log('on end_parsed end')
// });

//read from file 
// require("fs").createReadStream("./file.csv").pipe(converter);

app.get('/awshack/observations', function(req, res){
	res.header("Content-Type", "application/json");

	// var url = "https://hackathon1.smartconservationtools.org:8443/server/api/query/";
	var uid = req.query.uid
	var url = "https://hackathon1.smartconservationtools.org:8443/server/api/query/"+uid+"?format=csv&date_filter=waypointdate";

	// var jsonList = {}

	request(
	    {
	        url : url,
        	rejectUnauthorized: false,
	        headers : {
	            "Authorization" : auth
	        }
		},
	    function (error, response, body) {
	    	console.log("wcs api responded")
	    	var converter = new Converter({constructResult:true}); //for big csv data 
	    	converter.fromString(body, function(err,result){
			  	res.send(result)
			  	console.log("result sent in json")
			});
	    }
	)
	res.send("x")
	// rRes = res
	// request.get(url).pipe(converter);

	// res.send({data: "aws hi"})
});

// messages unread count
app.get('/message/unread/count', function(req, res){
	res.header("Content-Type", "application/json");

	pool.getConnection(function(err, connection){

		connection.query( ' SELECT count(*) as message_count, B.last_connection ' +
											' FROM chat_line A, ( ' +
											'   SELECT ( IF (count(*)=0, ?, last_connection) ) as last_connection ' +
											'   FROM connection_history ' +
											'   WHERE room_id = ? ' +
											'   AND person_id = ? ) B ' +
											' WHERE A.room_id = ?  ' +
											' AND A.sent_date > B.last_connection; ', [WORLD_CREATION_DATETIME, req.query.room_id, req.query.person_id, req.query.room_id], function(err, rows) {
			if (err) {
				res.send({
					error: err,
					me: err
				});
			}
			else{
				res.send({data: rows[0]})
			}
			connection.release();
		});
	});
});


app.get('/chat/users', function(req, res){
	res.send(user_data);
});
app.get('/chat/sockets', function(req, res){
	res.send(sockets);
});

app.get('/chat/io/sockets', function(req, res){
	res.send(Object.keys(io.engine.clients));
});

app.get('/chat/io/sockets', function(req, res){
	res.send(Object.keys(io.engine.clients));
});



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


//preflight



app.all('/*', function(req, res, next) {
		// res.header("Access-Control-Allow-Origin", "*");

	var url = req["url"];
	var method = req["method"];

	if(req.session.loggedInUser){
		global.userId = 'pid_'+req.session.loggedInUser.person_id
	}

	//console.log("####### ["+method+"] "+url);
	console.log(url+" headers", req["headers"], url+" params", req["params"], url+" query", req["query"],url+" body", req["body"]);
	//console.log();
	//console.log();
	//console.log();
	//console.log(req.useragent.source);
	//console.log(req.useragent);

	res.header("Content-Type", "application/json");
		// res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var origin = req.get('origin');
	res.header("Access-Control-Allow-Origin", origin);
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Max-Age", '86400'); // 24 hours
	res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");

	next();
});

app.options('/*', function(req, res, next) {
	console.log("options")

	res.send("{success:true}")
});
//app.get('/chat/users', function(req, res){
//		res.header("Content-Type", "application/json");
//
//		res.send({data:usernames});
//});





app.get('/installations', function(req, res){
		rest({
			method:"GET",
			path:parseUrl+'/installations',
			headers:{
				"X-Parse-Application-Id":parseAppId,
				"X-Parse-Master-Key":parseMasterKey
			}
		}).then(function(data) {
				response = data['entity']
				// console.log('response: ', response);
				res.send(response);
		});
});


app.post('/user/:person_id/installations', function(req, res){
	var personId = req.params.person_id;
	var deviceType= req.body.device_type;
	var deviceToken = req.body.device_token;
	var installationId = req.body.installation_id;

	installation.addInstallation(personId, installationId, deviceType, deviceToken, function(data){
		console.log(data);
	})

	//rest({
	//	method:"GET",
	//	path:parseUrl+'/installations',
	//	headers:{
	//		"X-Parse-Application-Id":parseAppId,
	//		"X-Parse-Master-Key":parseMasterKey
	//	}
	//}).then(function(data) {
	//	response = data['entity']
	//	// console.log('response: ', response);
	//	res.send(response);
	//});
});

// var time = require('time');

// Create a new Date instance, representing the current instant in time


app.get('/pichangas', userAuthentication, function(req, res) {

	console.log(req.session)
	var personId = req.session.loggedInUser.person_id

	var startDate = req.query.start_date
	var endDate = req.query.end_date

	var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
	var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
	var now = localISOTime.replace(/T/, ' ').replace(/\..+/, '');


	if (req.query.type == 'allupcoming'){
		startDate = now

		console.log('allupcoming '+startDate)
		pichanga.getMyPichangasByDate(personId, startDate, endDate, function(upcomingPichangasData){
			if(upcomingPichangasData.err){
				console.log('err')
				console.log(upcomingPichangasData)
				res.status(500).send(upcomingPichangasData)
			}else{
				res.send(upcomingPichangasData)
			}
		})

	}else if (req.query.type == 'allpast'){
		endDate = now

		console.log('allpast '+endDate)
		pichanga.getMyPichangasByDate(personId, startDate, endDate, function(pastPichangasData){
			if(pastPichangasData.err){
				console.log('err')
				console.log(pastPichangasData)
				res.status(500).send(pastPichangasData)
			}else{
				res.send(pastPichangasData)
			}
		})

	}
	else if (req.query.type == 'public'){
		var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
		var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
		startDate= localISOTime.replace(/T/, ' ').replace(/\..+/, '');

		console.log(startDate)
		pichanga.getMyPublicPichangas(personId, startDate, endDate, function(publicPichangasData){
			if(publicPichangasData.err){
				console.log('err')
				console.log(publicPichangasData)
				res.status(500).send(publicPichangasData)
			}else{
				res.send(publicPichangasData)
			}
		})
	}else if (req.query.type == 'private'){
			var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
			var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
			startDate= localISOTime.replace(/T/, ' ').replace(/\..+/, '');

			console.log(startDate)
			// startDate = now
			pichanga.getMyPrivatePichangas(personId, startDate, endDate, function(pichangasData){
				if(pichangasData.err){
					res.status(500).send()
				}else{
					res.send(pichangasData)
				}
			})
	}else if (req.query.type == 'past'){
			var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
			var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
			endDate = localISOTime.replace(/T/, ' ').replace(/\..+/, '');
			console.log(endDate)

			pichanga.getMyPrivatePichangas(personId, startDate, endDate, function(pichangasData){
				if(pichangasData.err){
					res.status(500).send()
				}else{
					res.send(pichangasData)
				}
			})
	}else{
		pichanga.getMyPrivatePichangas(personId, startDate, endDate, function(pichangasData){
				if(pichangasData.err){
					res.status(500).send()
				}else{
					res.send(pichangasData)
				}
			})
	}

});

app.get('/pichangas/:pichanga_id', function(req, res) {

	var pichangaId = req.params.pichanga_id;

	pichanga.getPichangaInfoById(pichangaId , function(data){
		pichanga.getPichangaCrews(pichangaId , function(crews){
			var pichanga = data;
			pichanga['crews'] = crews
			res.send(pichanga);
		})
	});
});

app.get('/pichangas/code/:pichangaCode', function(req, res){
	var pichangaCode = req.params.pichangaCode
	pichanga.getPichangaInfoByCode(pichangaCode, function(data){
		var assistants = pichanga.getPichangasAssistants(data.pichanga_id, function(assistantsData){
			data['assistants'] = assistantsData;
			res.send(data);
		})
	});
});

app.get(/^\/layer\/pichangas\/(.*)/, function(req, res) {

	var conversationId =   req.params[0]; // regexp's numbered capture group

	console.log('conversationId',conversationId)
	pichanga.getPichangaInfoByConversationId(conversationId , function(data){
		res.send(data);
	});

});

app.get('/pichangas/:pichanga_id/guests', function(req, res){

	pichanga.getPichangaGuests(req.params.pichanga_id, function(data){
		res.send(data);
	});

})


app.post('/pichangas', userAuthentication, function(req, res){
	// res.header("Content-Type", "application/json");

	console.log('post pichanga');
	console.log('serse', req.session.loggedInUser.person_id);

	console.log('fecha ini', req.body.start_date);
	console.log('fecha fin', req.body.end_date);

	var userId = req.session.loggedInUser.person_id;

	var startDate = req.body.start_date.replace('T', ' ').replace('Z', ' ');
	var endDate = req.body.end_date.replace('T', ' ').replace('Z', ' ');
	var pichangaName = req.body.name;
	var organizerId = userId
	var crewIds = req.body.crew_ids;
	var details = req.body.details;
	var minAssistants = req.body.min_assistants;
	var maxAssistants = req.body.max_assistants;
	var fee = req.body.fee;
	var isPublic = req.body.is_public;
	var placeId = req.body.place_id;

	var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
	var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
	var nowDate = localISOTime.replace(/T/, ' ').replace(/\..+/, '');

	if(moment(startDate).isBefore(moment())){
		console.log(moment().format())
		console.log(moment(startDate).format())
		res.send({me:'Lo siento, no puedes crear pichangas en el pasado. Aún.'})
		return
	}


	if(isPublic){
		users.checkIfUserHasPublicPichanga(userId , function(publicCreatedPichangas){
			if(publicCreatedPichangas.length<=1){
				pichanga.createPichanga(startDate, endDate, organizerId, pichangaName, details, minAssistants, maxAssistants, fee, placeId, crewIds, isPublic, function(data){
					res.send(data)
				})
			}else{
				res.send({me:'No puedes crear mas de dos pichangas públicas a la vez'})
			}
		})
	}else{
		pichanga.createPichanga(startDate, endDate, organizerId, pichangaName, details, minAssistants, maxAssistants, fee, placeId, crewIds, isPublic, function(data){
			res.send(data)
		})
	}


});

app.put('/pichangas/:pichanga_id', userAuthentication, function(req, res){

	var userId = req.session.loggedInUser.person_id

	console.log('post pichanga');
	console.log('serse', req.session.loggedInUser.person_id);

	console.log('fecha ini', req.body.start_date);
	console.log('fecha fin', req.body.end_date);

	var pichangaId = req.params.pichanga_id;

	pichanga.getPichangaInfoById(pichangaId, function(pichangaData){

		if(pichangaData['organizator_id'] == userId){

			var registrationOpen = req.body.registration_open;

			if(registrationOpen != undefined){
				pichanga.changeRegistrationOpen(pichangaId, registrationOpen, function(data){
					res.send(data);
				})
			}else{
				var startDate = req.body.start_date.replace('T', ' ').replace('Z', ' ');
				var crewIds = req.body.crew_ids;
				var placeId = req.body.place_id;

				pichanga.updatePichanga(pichangaId, startDate, placeId, crewIds, function(data){
					res.send(data);
				})
			}
		}else{
			res.send({me:"Authorization to update Pichanga denied"})
		}
	})
});



// es una coleccion
app.delete('/pichangas/:pichanga_id', function(req, res){
	res.header("Content-Type", "application/json");
	pool.getConnection(function(err, connection){
		connection.query('  DELETE FROM assistant WHERE pichanga_id = ? ', [req.params.pichanga_id], function(err, rows) {
				if (err) {
					res.send({
						error: err
					});
				}
				else{

					connection.query('  DELETE FROM connection_history WHERE room_id = ? ', [req.params.pichanga_id], function(err, rows) {
						if (err) {
							res.send({
								error: err
							});
						}
						else{
							connection.query('  DELETE FROM chat_line WHERE room_id = ? ', [req.params.pichanga_id], function(err, rows) {
								if (err) {
									res.send({
										error: err
									});
								}
								else{

									connection.query('  DELETE FROM crew_guest WHERE pichanga_id = ? ', [req.params.pichanga_id], function(err, rows) {
										if (err) {
											res.send({
												error: err
											});
										}
										else{
											connection.query('  DELETE FROM pichanga WHERE pichanga_id = ? ', [req.params.pichanga_id], function(err, rows) {
												if (err) {
													res.send({
														error: err
													});
												}
												else{
													res.send({
														me: success_messages.pichanga_deleted,
														data: []
													});
												}
											});
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

app.get('/pichangas/:pichanga_id/assistants', function(req, res){

	var pichangaId = req.params.pichanga_id

	pichanga.getPichangasAssistants(pichangaId, function (data){

		res.send({data:data})

	})


	//pool.getConnection(function(err, connection){
	//	connection.query( " SELECT A.pichanga_id, B.person_id, B.profile_img_url, " +
	//	"CONCAT(IFNULL(B.first_name,'') ,' ', IFNULL(B.last_name,'')) name, B.first_name, IFNULL(B.last_name,'') as last_name, B.email, A.comment, A.payment " +
	//										' FROM assistant A, person B ' +
	//										' WHERE A.pichanga_id = ? ' +
	//										' AND A.person_id = B.person_id ' +
	//										' ORDER BY RAND() ', [req.params.pichanga_id], function(err, rows) { //TODO ORDER BY RAND()
    //
	//		if (err) {
	//			res.send({
	//				error: err
	//			});
	//		}
	//		else {
	//			res.send({data: rows});
	//		}
	//		connection.release();
	//	});
	//});
});

app.post('/pichangas/:pichanga_id/assistants', userAuthentication, function(req, res){
		res.header("Content-Type", "application/json");

	var personId = req.session.loggedInUser.person_id;
	var pichangaId = req.params.pichanga_id;
	var comment = req.body.comment;
	//var deviceType =
	pichanga.getPichangaInfoById(pichangaId, function(pichangaData){

		if( pichangaData['registration_open']==1){
			pool.getConnection(function(err, connection){
				connection.query('  INSERT INTO assistant (pichanga_id, person_id, comment) ' +
				'  VALUES (?, ?, ?) ', [pichangaId, personId ,
					req.body.comment], function(err, rows) {
					if (err) {
						res.send({
							error: err,
							me: err
						});
					}
					else{
						users.getById(personId, function(user){
							var message = user["name"]+" se ha unido a la pichanga '"+pichangaData["name"]+"'";
							push.sendChannelNotificationOnNewJoinedUser(message, pichangaId, function(data){
								console.log("notification sent: " + message);
							})
						})
						push.subscribeToPichangaChannel(personId, pichangaId, function(data){
							console.log(data)
						})

						layer.addUserToConversation(pichangaData['layer_conversation_id'], personId, function(data){
							console.log("layer.addUserToConversation");
							console.log(data);
						})


						res.send({data: []});
					}
					connection.release();
				});
			});
		}else{
			var resS = {me: "No puedes unirte a una pichanga cerrada"}
			console.log(resS)
			res.send(resS);
		}


	})
});

app.delete('/pichangas/:pichanga_id/assistants/:person_id', userAuthentication, function(req, res){

	var pichangaId = req.params.pichanga_id;
	var personId = req.params.person_id

    //TODO validation

	pichanga.getPichangaInfoById(pichangaId, function(pichangaData){
		pool.getConnection(function(err, connection){
			connection.query('  DELETE FROM assistant WHERE pichanga_id = ? AND person_id = ? '
				, [pichangaId, personId], function(err, rows) {
					if (err) {
						res.send({
							error: err
						});
					}
					else{
						res.send({
							me: success_messages.assistant_deleted,
							data: []
						});
						layer.removeUserFromConversation(pichangaData['layer_conversation_id'], personId, function(data){
							console.log("layer.removeUserFromConversation");
							console.log(data);
						})
					}
					connection.release();
				});
		});
	})
});

app.get('/logout', function(req, res){
	delete req.session.loggedInUser;
	res.send({success:true});
});

app.get('/login', function(req, res){
		res.header("Content-Type", "application/json");

		//console.log("Login request.headers", req["headers"]);
		//console.log("Login request.headers", req["headers"]);
		//console.log(req.query);

		pool.getConnection(function(err, connection){
			connection.query( ' SELECT (count(*) > 0) as correct_login , A.verified as verified_account ' +
												' FROM login A ' +
												' WHERE A.email = ? ' +
												' AND A.pass = MD5(?) ' ,
												[req.query.email.toLowerCase(), req.query.pass], function(err, rows) {
				if (err) {
					console.log(err);
					res.send({
						error: err
					});
				}
				else {
					var correct_login = rows[0].correct_login;
					var verified_account = rows[0].verified_account;

					if(!correct_login){
						res.send({
							error: error_messages.incorrect_login,
							me: error_messages.incorrect_login
						});
					}
					else{
						if(!verified_account){
							res.send({
								error: error_messages.account_not_verified,
								me: error_messages.account_not_verified
							});
						}
						else{

							try{
								var installationObjectId = req.body.inst_oid;
								var deviceType= req.body.inst_device_type;
								var deviceToken = req.body.inst_device_token;

								if(installationObjectId!=null) {
									installation.addInstallation(personId, installationObjectId , deviceType, deviceToken, function (data) {
										console.log("installation added");
										console.log(data);
									})
								}
							}catch (e){
								console.log(e);
							}

							users.getByEmail(req.query.email, function(data){
								console.log('data user', data);
								req.session.loggedInUser = data;
								//data.cookie_token = req.session.cookie;

								var token = jwt.sign(data, jwtSecret, { expiresInMinutes: 60*5 });

								data.token = token;
								console.log('jwt', token);

								res.send({data:data});
							});
						}
					}
				}
			});
			connection.release();
		});
});



var layerProviderID = "layer:///providers/42055dce-c2ba-11e5-851e-576e000000b0";

var hfLayerKeyID = "layer:///keys/ab964176-1496-11e6-828d-b3320000087c";
var hfPrivateKey = null;
if (!hfPrivateKey) {
	try {
		hfPrivateKey = fs.readFileSync('layer-key-hf.pem').toString();
	} catch(e) {
		console.error('Couldn\'t find Private Key file: layer-key.pem');
	}
}

app.post('/hf/layer/auth', function(req, res){
	var userId = req.body.user_id;
	var nonce = req.body.nonce;

	if (!userId) return res.status(400).send('Missing `user_id` body parameter.');
	if (!nonce) return res.status(400).send('Missing `nonce` body parameter.');

	if (!layerProviderID) return res.status(500).send('Couldn\'t find LAYER_PROVIDER_ID');
	if (!hfLayerKeyID) return res.status(500).send('Couldn\'t find LAYER_KEY_ID');
	if (!hfPrivateKey) return res.status(500).send('Couldn\'t find Private Key');

	var header = JSON.stringify({
		typ: 'JWT',           // Expresses a MIMEType of application/JWT
		alg: 'RS256',         // Expresses the type of algorithm used to sign the token, must be RS256
		cty: 'layer-eit;v=1', // Express a Content Type of application/layer-eit;v=1
		kid: hfLayerKeyID
	});

	var currentTimeInSeconds = Math.round(new Date() / 1000);
	var expirationTime = currentTimeInSeconds + 10000;

	var claim = JSON.stringify({
		iss: layerProviderID,       // The Layer Provider ID
		prn: userId,                // User Identifier
		iat: currentTimeInSeconds,  // Integer Time of Token Issuance
		exp: expirationTime,        // Integer Arbitrary time of Token Expiration
		nce: nonce                  // Nonce obtained from the Layer Client SDK
	});

	var jws = "x";
	try {
		jws = jsrsasign.jws.JWS.sign('RS256', header, claim, hfPrivateKey);
	} catch(e) {
		return res.status(500).send('Could not create signature. Invalid Private Key: ' + e);
	}

	console.log("JWS");
	console.log(jws);
	res.send({"identity_token": jws});
})


var layerProviderID = "layer:///providers/42055dce-c2ba-11e5-851e-576e000000b0";
var layerKeyID = "layer:///keys/30156e6a-c2e7-11e5-9063-80b60e0058d9";
var privateKey = null;
if (!privateKey) {
	try {
		privateKey = fs.readFileSync('layer-key.pem').toString();
	} catch(e) {
		console.error('Couldn\'t find Private Key file: layer-key.pem');
	}
}

app.post('/layer/auth', function(req, res){
	var userId = req.body.user_id;
	var nonce = req.body.nonce;

	if (!userId) return res.status(400).send('Missing `user_id` body parameter.');
	if (!nonce) return res.status(400).send('Missing `nonce` body parameter.');

	if (!layerProviderID) return res.status(500).send('Couldn\'t find LAYER_PROVIDER_ID');
	if (!layerKeyID) return res.status(500).send('Couldn\'t find LAYER_KEY_ID');
	if (!privateKey) return res.status(500).send('Couldn\'t find Private Key');

	var header = JSON.stringify({
		typ: 'JWT',           // Expresses a MIMEType of application/JWT
		alg: 'RS256',         // Expresses the type of algorithm used to sign the token, must be RS256
		cty: 'layer-eit;v=1', // Express a Content Type of application/layer-eit;v=1
		kid: layerKeyID
	});

	var currentTimeInSeconds = Math.round(new Date() / 1000);
	var expirationTime = currentTimeInSeconds + 10000;

	var claim = JSON.stringify({
		iss: layerProviderID,       // The Layer Provider ID
		prn: userId,                // User Identifier
		iat: currentTimeInSeconds,  // Integer Time of Token Issuance
		exp: expirationTime,        // Integer Arbitrary time of Token Expiration
		nce: nonce                  // Nonce obtained from the Layer Client SDK
	});

	var jws = "x";
	try {
		jws = jsrsasign.jws.JWS.sign('RS256', header, claim, privateKey);
	} catch(e) {
		return res.status(500).send('Could not create signature. Invalid Private Key: ' + e);
	}

	console.log("JWS");
	console.log(jws);
	res.send({"identity_token": jws});
})

app.post('/fblogin', function(req, res){
	res.header("Content-Type", "application/json");

	//console.log("Login request.headers", req["headers"]);
	//console.log("Login request.headers", req["headers"]);
	//console.log(req.query);

	if(req.body.email == null || req.body.fb_id== null || req.body.first_name == null || req.body.last_name == null){
		res.send({
			error: "email, fb_id, first_name, last_name, updated_time and inst_oid are required"
		});
		return;
	}

	var email = req.body.email.toLowerCase();
	var fbId = req.body.fb_id;
	var firstName = req.body.first_name;
	var lastName = req.body.last_name;
	var updatedTime = req.body.updated_time;

	var facebookProfileUrl = "http://graph.facebook.com/"+fbId+"/picture?type=large";
	//var registrationOrigin = req
	var origin = req.useragent.source;
	//console.log();
	//console.log(req.useragent);

	var installationObjectId = req.body.inst_oid;
	var deviceType= req.body.inst_device_type;
	var deviceToken = req.body.inst_device_token;
	var fcmDeviceToken =  req.body.fcm_device_token;

	users.getByEmail(email,function(user){
		if('email' in user){ //	User already exists - Update fb_user table

			console.log("Connecting to FB Account");
			//return;

			var personId = user['person_id'];
			//var email = user['email'];

			users.updateFBUser(personId, fbId, firstName, lastName, email, updatedTime, function(data){
				console.log(data)
			});

			users.updateUserImageURL(personId, facebookProfileUrl, function(data){
				user.profile_img_url = facebookProfileUrl;
				req.session.loggedInUser = user;

				var token = jwt.sign(user, jwtSecret, { expiresInMinutes: 60*5 });
				user.token = token;

				res.send(user);
				//res.send({success:true});
			})

			users.updateLastLogin(personId, origin,function(res){});

			try{

				if (fcmDeviceToken != null){
					installation.addInstallation(personId, fcmDeviceToken , deviceType, 'FCM', fcmDeviceToken, function (data) {
						console.log("fcm installation added");
						console.log(data);
						crew.getCrewsByMember(personId, null, function(crews){
							push.subscribeToCrewChannels(personId, crews, function(res){
								console.log(res);
							})
						})
					})
				}
				else if(installationObjectId!=null) {
					installation.addInstallation(personId, installationObjectId , deviceType, 'Parse', deviceToken, function (data) {
						console.log("installation added");
						console.log(data);
						crew.getCrewsByMember(personId, null, function(crews){
							push.subscribeToCrewChannels(personId, crews, function(res){
								console.log(res);
							})
						})
					})
				}
			}catch (e){
				console.log(e);
			}

		}else{ //	User doesnt exist - create PM profile for him

			console.log("Registering new User using FB");

			users.registerNewUser(firstName, lastName, email, facebookProfileUrl, origin, function(result){
				if(result){

					users.getByEmail(email, function(newUser){
						var personId = newUser["person_id"];
						req.session.loggedInUser = newUser;

						users.updateFBUser(personId, fbId, firstName, lastName, email, updatedTime, function(){
							//console.log("")
						});

						//var token = jwt.sign(data, jwtSecret, { expiresInMinutes: 60*5 });
						//newUser.token = token;
						try{
							if(installationObjectId!=null) {
								installation.addInstallation(personId, installationObjectId , deviceType, deviceToken, function (data) {
									console.log("installation added");
									console.log(data);
									crew.getCrewsByMember(personId, null, function(crews){
										push.subscribeToCrewChannels(personId, crews, function(res){
											console.log(res);
										})
									})

								})
							}
						}catch (e){
							console.log(e);
						}

						res.send(newUser);
					})
				}
			})
		}


	});
});

// insert login info
app.post('/login', function(req, res){
	res.header("Content-Type", "application/json");

	pool.getConnection(function(err, connection){
		connection.query( ' INSERT INTO login (email, pass, verified, token) ' +
											' VALUES (?, MD5(?), ?, ?) ', [req.body.email.toLowerCase(), req.body.pass, false, req.body.token], function(err, rows) {

				console.log(err);
				if (err) {
					res.send({
						error: err,
						me: error_messages.invalid_user
					});
				}
				else{
					res.send({
						data: []
					})
				}
		});
		connection.release();
	});
});

app.put('/login', function(req, res){
	res.header("Content-Type", "application/json");
	console.log(req.body);

	pool.getConnection(function(err, connection){
		connection.query( ' UPDATE login SET pass = MD5(?) ' +
											' WHERE email = ? AND token = ? ', [req.body.pass, req.body.email.toLowerCase(), req.body.token], function(err, rows) {

				console.log(rows);

				if (err) {
					res.send({
						error: err,
						me: error_messages.invalid_user
					});
				}
				else{

					if(Boolean(rows.affectedRows)){
						res.send({
							data: []
						});
					}
					else{
						res.send({
							me: 'User or token invalid'
						});
					}

				}
		});
		connection.release();
	});
});

app.get('/person', function(req, res){
	users.queryUsers(req.query.query, function(data){
		res.send(data)
	});
});

app.get('/person/:email/pichangas', function(req, res){
	console.log(req.params.email);
	// res.send('x')
	users.getPichangasByAssistantEmail(req.params.email, function(data){
		res.send(data)
	});
});

app.get('/person/:email', function(req, res){
	users.getByEmail(req.params.email, function(data){
		res.send(data)
	});
});

app.get('/user', userAuthentication, function(req, res){
	var ob = req.session.loggedInUser;
	res.send(ob);
});

app.get('/users', function(req, res){

	var searchQuery =  req.query.q;
	var token = req.query.token;
	var verified = req.query.verified;

	users.searchUsers(token, verified, searchQuery, function(data){
		res.send({data:data});
	})
});


// Register new user
app.post('/person', function(req, res){
		res.header("Content-Type", "application/json");


	// if (true){
	// 	res.send({
	// 		me: "Registo de email desactivado por el momento - Use Facebook"
	// 	});
	// 	return;
	// }

	if(req.body.email == null || req.body.first_name == null || req.body.last_name == null ||
		req.body.email.length==0 || req.body.first_name.length==0 || req.body.last_name.length==0){
		res.send({
			me: "email, first_name, last_name, are required"
		});
		return;
	}

	var firstName = req.body.first_name;
	var lastName = req.body.last_name;
	var email = req.body.email.toLowerCase();
	var pass = req.body.pass;
	var profileImgUrl = 'https://lh3.googleusercontent.com/KPe7Y1tq0_6zwtpy3wdMtQXIO1EW1bVCxGdReG8Af6bd_npJ6GgQxP15sUPRTlaxuA=w300'; // TODO fix
	var registrationOrigin = req.useragent.source;

	users.getToken(email, function(token_res){
		console.log('token_res' ,token_res);

		users.insertLogin(email, pass, token_res, function(login_res){
			console.log('login_res', login_res);

			users.insertPerson(firstName, lastName, email, profileImgUrl, registrationOrigin, function(person_res, data){
				console.log('person_res', person_res);
				if(person_res == false){
					res.send({me:"email ya está tomado", success:false});
				}else{
					mail.sendActivationMail(email, website, users, function(mail_res){
						console.log('mail_res', mail_res);
						res.send({me:"Porfavor verifique en su email", success:true});
					});
				}

			});

		});
	});

});

app.get('/mail/verification', function(req, res){
	res.header("Content-Type", "application/json");
	pool.getConnection(function(err, connection){
		connection.query( ' UPDATE login ' +
											' SET verified = TRUE ' +
											' WHERE token = ? ' +
											' AND email = ? ', [req.query.token, req.query.email], function(err, rows) {
			if (err) {
				res.send({
					error: err,
					me: err
				});
			}
			else {
				var options = {
					baseUrl: servicehost,
					uri : '/person/' + req.query.email,
					method : 'GET',
					json: true
				};

				request(options, function (err, response, rows) {
					if(err || rows.error){
						res.send({
							error: (err || rows.error),
							me: (err || rows.me)
						});
					}
					else{
						console.log(rows);
						res.send({
							me: info_messages.user_activated,
							data: rows
						});
					}
				});
			}
			connection.release();
		});
	});
});

app.get('/team', function(req, res){
	res.header("Content-Type", "application/json");
	pool.getConnection(function(err, connection){
		connection.query( ' SELECT team_id, name FROM team ',
											function(err, rows) {
			if (err) {
				res.send({me: err});
			}
			else {
				res.send({data: rows});
			}
			connection.release();
		});

	});
});


app.get('/crews', userAuthentication,  function(req, res){
	res.header("Content-Type", "application/json");

	var personId = req.session.loggedInUser.person_id;
	var query = req.query.query;
	crew.getCrewsByMember(personId, query, function(data){
		res.send({'data':data});
	})
});

app.get('/1/crews', userAuthentication,  function(req, res){
	res.header("Content-Type", "application/json");

	var personId = req.session.loggedInUser.person_id;
	var query = req.query.query;
	crew.getCrewsByMember(personId, query, function(data){
		res.send(data);
	})
});

//get crew detail and its members
app.get('/crews/:crew_id', userAuthentication,  function(req, res){
	res.header("Content-Type", "application/json");

	crew.getCrewById(req.params.crew_id, function(data){
		res.send(data);
	});
});

//ADD NEW CREW
app.post('/crews', userAuthentication, function(req, res){

	var personId = req.session.loggedInUser.person_id;
	var name = req.body.name;

	var origin = req.useragent.source;

	if(name && name.length>2){
		crew.addNewCrew(personId, name, origin, function(data){
			res.send(data);
		})
	}else{
		res.send({me:"Please enter a valid crew name"})
	}
});
app.post('/1/crews', userAuthentication, function(req, res){
	res.header("Content-Type", "application/json");

	var personId = req.session.loggedInUser.person_id;
	var name = req.body.name;
	var origin = req.useragent.source;

	if(name && name.length>2){
		crew.addNewCrew(personId, name, origin, function(data){
			res.send(data);
		})
	}else{
		res.send({me:"Please enter a valid crew name"})
	}

});

//DELETE CREW
app.delete('/crews/:crew_id', userAuthentication, function(req, res){
	res.header("Content-Type", "application/json");
	pool.getConnection(function(err, connection){
		connection.query( ' DELETE FROM crew_guest WHERE crew_id = ? ', [req.params.crew_id],
											function(err, rows) {
			if (err) {
				res.send({me: err});
			}
			else {
				connection.query( ' DELETE FROM crew_member WHERE crew_id = ? ', [req.params.crew_id],
											function(err, rows) {
					if (err) {
						res.send({me: err});
					}
					else {
						connection.query( ' DELETE FROM crew WHERE crew_id = ? ', [req.params.crew_id],
											function(err, rows) {
							if (err) {
								res.send({me: err});
							}
							else {
								res.send({data: rows});
							}
						});
					}
				});
			}
			connection.release();
		});

	});
});

//ADD MEMBER TO CREW
app.post('/crews/:crew_id/members/:person_id', userAuthentication, function(req, res){
	res.header("Content-Type", "application/json");

	var inviterId = req.session.loggedInUser.person_id;


	crew.addCrewMember(req.params.crew_id, inviterId, req.params.person_id, function(data){
		res.send(data);
	});
});

//REMOVE MEMBER FROM CREW
app.delete('/crews/:crew_id/members/:person_id',userAuthentication,  function(req, res){

	pool.getConnection(function(err, connection){
		connection.query( ' DELETE FROM crew_member WHERE person_id = ? AND crew_id = ? ', [req.params.person_id, req.params.crew_id],
											function(err, rows) {
			if (err) {
				res.send({me: err});
			}
			else {
				res.send({data: rows});
			}
			connection.release();
		});

	});
});

//PLACES

// getPlaceDetail
app.get('/places/:place_id', userAuthentication, function(req, res){
	var userId = req.session.loggedInUser.person_id;
	var placeId = req.params.place_id;


	place.getPlaceDetail(placeId, function(data){

		var placeData = data;

		var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
		var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
		var lowerDate = localISOTime.replace(/T/, ' ').replace(/\..+/, '');

		place.getPlacePichangas(placeId, lowerDate, function(pichangas){
			placeData.pichangas = pichangas
			if(placeData.pichangas && placeData.closest_players){
				res.send(placeData);
			}
		})
		var distance = 9
		place.getClosestPlayersFromPlace(placeId, distance, function(players){
			placeData.closest_players = players
			if(placeData.pichangas && placeData.closest_players){
				res.send(placeData);
			}
		})
		//res.send(data)
	})
});

app.get('/places', userAuthentication, function(req, res){
	var userId = req.session.loggedInUser.person_id;
	var lat = req.query.lat || undefined;
	var lng = req.query.lng || undefined;
	var query = req.query.q
	place.searchPlacesClosesToPoint(lat, lng, userId, query, function(data){
		res.send(data)
	})
	//place.searchPlaces(req.query.q, function(data) {
	//	res.send(data)
	//})
});
app.get('/1/places', userAuthentication, function(req, res){
	var userId = req.session.loggedInUser.person_id;
	var lat = req.query.lat || undefined;
	var lng = req.query.lng || undefined;
	var query = req.query.q
	place.searchPlacesClosesToPoint2(lat, lng, userId, query, function(data){
		res.send(data)
	})
	//place.searchPlaces(req.query.q, function(data) {
	//	res.send(data)
	//})
});

app.post('/places', userAuthentication, function(req, res){

	var name = req.body.name;
	var address = req.body.address;
	var lat = req.body.lat
	var lng = req.body.lng
	var reference = req.body.reference // not used
	var personId= req.session.loggedInUser.person_id;
	var origin = req.useragent.source;

	place.registerPlace(name, address, lat, lng, reference, personId, origin, function(data){
		res.send({data:data});
	})
});


//Re deploy//

app.post('/places/:place_id/pic', upload.single('place_pic'), function(req, res){

	console.log('req.file')
	console.log(req.file.path)
	console.log(req.body)

	var placeId = req.params.place_id

	var s3 = new AWS.S3();

	fs.readFile(req.file.path, function(err, fileData) {


		var s3_params = {
			Bucket: 'pm-places-pics',
			Key: "place_"+placeId,
			Expires: 60,
			ContentType: req.file.mimetype,
			ACL: 'public-read',
			Body:fileData
		};

		s3.putObject(s3_params, function(err, data) {

			if (err)
				console.log(err)

			else{
				console.log("Successfully uploaded to AWS");
				console.log(data);
				place.registerPlacePicURL(placeId, "https://s3.amazonaws.com/pm-places-pics/place_"+placeId, function(){

					res.send("{\"m\":\"Successfully uploaded\"}")
				})

			}
		});
	});
});


app.post('/2/places/:place_id/pic', upload.single('place_pic'), function(req, res) {

	console.log('req.file.path',req.file.path)
	console.log('req.body',req.body)

	var placeId = req.params.place_id

	//var s3 = new AWS.S3();

	var s3Client = new awsS3Upload('pm-places-pics', {
		aws: {
			path: 'pics/',
			region: 'us-east-1',
			acl: 'public-read'
		},

		cleanup: {
			versions: true,
			original: true
		},

		original: {
			awsImageAcl: 'private'
		},

		versions: [{
			maxHeight: 1040,
			maxWidth: 1040,
			format: 'jpg',
			suffix: '-large-place'+placeId,
			quality: 80,
			awsImageExpires: 31536000,
			awsImageMaxAge: 31536000
		},{
			maxWidth: 780,
			aspect: '3:2!h',
			suffix: '-medium-place-'+placeId
		},{
			maxWidth: 320,
			aspect: '16:9!h',
			suffix: '-small-place-'+placeId
		},{
			maxHeight: 100,
			aspect: '1:1',
			format: 'png',
			suffix: '-thumb1-place-'+placeId
		},{
			maxHeight: 250,
			maxWidth: 250,
			aspect: '1:1',
			suffix: '-thumb2-place-'+placeId
		}]

		//versions: [{
		//	maxHeight: 1040,
		//	maxWidth: 1040,
		//	format: 'png',
		//	suffix: '-large-place-'+placeId
		//}, {
		//	maxWidth: 780,
		//	aspect: '3:2!h',
		//	format: 'png',
		//	suffix: '-small-place-'+placeId
		//},{
		//	maxHeight: 250,
		//	maxWidth: 250,
		//	aspect: '1:1',
		//	suffix: '-thumb2'
		//}]
	});

	console.log("starting s3 upload...")
	s3Client.upload(req.file.path, {}, function (err, versions, meta) {
		if (err) {
			console.log(err)
			//throw err;
		}

		console.log('versions', versions)
		console.log(meta)
		var large = versions[0]
		var small = versions[1]
		//var thumb= versions[2]
		console.log("s3 upload completed")
		console.log("saving URL in db")
		place.registerPlacePicURL(placeId, small.url, large.url, function () {
			console.log('saved in db')
			res.send("{\"m\":\"Successfully uploaded\"}")
		})
	});


	//fs.readFile(req.file.path, function(err, fileData) {
	//
	//
	//	var s3_params = {
	//		Bucket: 'pm-places-pics',
	//		Key: "place_"+placeId,
	//		Expires: 60,
	//		ContentType: req.file.mimetype,
	//		ACL: 'public-read',
	//		Body:fileData
	//	};
	//
	//	s3.putObject(s3_params, function(err, data) {
	//
	//		if (err)
	//			console.log(err)
	//
	//		else{
	//			console.log("Successfully uploaded to AWS");
	//			console.log(data);
	//			place.registerPlacePicURL(placeId, "https://s3.amazonaws.com/pm-places-pics/place_"+placeId, function(){
	//
	//				res.send("{\"m\":\"Successfully uploaded\"}")
	//			})
	//
	//		}

});



app.post('/1/places', userAuthentication, function(req, res){

	var name = req.body.name;
	var address = req.body.address;
	var lat = req.body.lat
	var lng = req.body.lng
	var reference = req.body.reference // not used
	var personId= req.session.loggedInUser.person_id;
	var origin = req.useragent.source;

	place.registerPlace(name, address, lat, lng, reference, personId, origin, function(data){
		res.send(data);
	})
});

app.post('1/push/notifications', userAuthentication, function(req, res){

	var userId = req.session.loggedInUser.person_id;
	var userName = req.session.loggedInUser.name;
	var message = req.body.message;
	var pichangaId = req.body.pichanga_id

	push.sendChannelNotification(userId, userName, message, pichangaId, function(data){
		console.log(data)
	})
})

app.delete('/places/:place_id', userAuthentication, function(req, res){
	res.header("Content-Type", "application/json");
	pool.getConnection(function(err, connection){
		connection.query( ' DELETE FROM place WHERE place_id = ? ', [req.params.place_id],
											function(err, rows) {
			if (err) {
				res.send({me: err});
			}
			else {
				res.send({data: rows});
			}
			connection.release();
		});

	});
});


app.get('/token/:email', function(req, res){
	res.header("Content-Type", "application/json");

	users.getToken(req.params.email, function(data){
		res.send(data);
	});

});

app.get('/mail/:email/activation', function(req, res){
	res.header("Content-Type", "application/json");

	mail.sendActivationMail(req.params.email, website, users, function(data){
		res.send(data);
	});

});


app.get('/mail/:email/forgot', function(req, res){
	res.header("Content-Type", "application/json");

	console.log('innnn');

	mail.sendForgotMail(req.params.email, website, users, function(data){
		res.send(data);
	});
});

app.get('/mail/:pichanga_id/all', userAuthentication, function(req, res){
	res.header("Content-Type", "application/json");

	mail.sendPichangaInvitation(req.params, pichanga, function(data){
		res.send(data);
	});

});

app.get('/session', function(req, res){
	res.send(req.session);
})

app.get('/ping', function(req, res){
	//console.log("ping")
	req.session.userId = 'id1';
	//console.log("ping2")
	res.send("pong3")
	res.end();
})

app.get('/mail', function(req, res){
	res.header("Content-Type", "application/json");

	mail.sendMail(req.query, function(data){
		res.send(data);
	});

});


app.get('/1/gatekeeper/entries', function(req, res){
	gateKeeper.getAllKeyValues(function(data){
		res.send(data);
	})
});

// ADMIN SERVICES




app.get('/1/admin/pichangas', function(req, res){

	if(req.query.place_id){
		console.log('req.query.place_id',req.query.place_id)
		var placeId = req.query.place_id
		pichanga.getAllPichangasByPlaceId(placeId, function(data){
			res.send(data);
		})
	}else{
		pichanga.getAllPichangas(function(data){
			res.send(data);
		})
	}

});

//app.get('/1/admin/pichangas/:pichangaId', function(req, res){
//
//	var pichangaId = req.params.pichangaId
//	pichanga.getPichangaInfoById(pichangaId,function(data){
//		res.send(data);
//	})
//});

app.get('/1/admin/pichangas/:pichangaId', function(req, res){

	var pichangaId = req.params.pichangaId
	pichanga.getPichangaInfoById(pichangaId,function(data){
		var cid = data["layer_conversation_id"];
		layer.getConversationByCID(cid,function(conversation){
			data['conversation'] = conversation;
			res.send(data);
		})

	})
});

//PLACES

app.get('/1/admin/places', function(req, res){
	place.getAllPlaces(function(data){
		res.send(data);
	})
});

app.get('/1/admin/places/:placeId/closesplayers', function(req, res){

	var placeId = req.param.place_id
	console.log('placeId' + placeId)
	if(placeId){
		var distance = 9
		place.getClosestPlayersFromPlace(placeId, distance, function(data){
			res.send(data);
		})
	}
});

app.get('/1/admin/places/:placeId', function(req, res){

	var placeId = req.params.placeId
	console.log('placeId' + placeId)
	if(placeId){
		var distance = 9
		var placeDetail = {}
		place.getPlaceDetail(placeId, function(data){

			placeDetail = data;

			place.getClosestPlayersFromPlace(placeId, distance, function(data){
				placeDetail.closest_people = data;
				res.send(placeDetail);
			})
		})

	}
});

app.delete('/1/admin/places/:place_id', function(req, res){

	place.removePlace(req.params.place_id, function(result){
		res.send(result)
	})
});

app.get('/1/admin/gatekeeper/entries', function(req, res){
	gateKeeper.getAllKeyValues(function(data){
		res.send(data);
	})
});

app.post('/1/admin/gatekeeper/entries', function(req, res) {
	var name = req.body.name;
	var value = req.body.value;
	gateKeeper.addNewKeyValue(name, value, function (data) {
		res.send(data);
	})
})

app.put('/1/admin/gatekeeper/entries', function(req, res){
	var name = req.body.name;
	var value = req.body.value;
	gateKeeper.updateEntryValue(name , value ,function(data){
		res.send(data);
	})
});

app.get('/1/admin/users', function(req, res){

	res.header("Content-Type", "application/json");

	// var url = "https://hackathon1.smartconservationtools.org:8443/server/api/query/";
	var uid = req.query.uid
	var url = "https://hackathon1.smartconservationtools.org:8443/server/api/query/"+uid+"?format=csv&date_filter=waypointdate";

	// var jsonList = {}

	request(
	    {
	        url : url,
        	rejectUnauthorized: false,
	        headers : {
	            "Authorization" : auth
	        }
		},
	    function (error, response, body) {
	    	console.log("wcs api responded")
	    	console.log(body)
	    	var converter = new Converter({constructResult:true}); //for big csv data 
	    	converter.fromString(body, function(err,result){
			  	res.send(result)
			  	console.log("result sent in json")
			});
	    }
	)
	// res.send("x")


});

app.get('/1/admin/crews/:crewId', function(req, res){
	crew.getCrewById(req.params.crewId, function(data){
		res.send(data);
	});
});


app.get('/1/admin/crews', function(req, res){

	console.log("getting all crews info ");
	console.log("getting all crews error ");

	crew.getAllCrews(function(data){
		res.send(data)
	})
});

app.get('/1/admin/users/:user_id', function(req, res){
	var userId = req.params.user_id;
	users.getById(userId, function(user){

		installation.getInstallationsByPersonId(userId , function(installation){
			user.installations = installation;
			res.send(user)
		})
	})
});

app.get('/1/admin/reports/users/registrations', function(req, res){
	//var userId = req.params.user_id;
	users.registrationsByDate(function(data){
		res.send(data)
	})
});

// Add the error logger after all middleware and routes so that
// it can log errors from the whole application. Any custom error
// handlers should go after this.
// [START errors]
app.use(logging.errorLogger);

