module.exports = function(db) {
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'pichangamaker@gmail.com',
			pass: 'Pichanga123'
		}
	});

	var layer = require('./layer.js')();
	var pushNote = require('./push_utils.js')(db);
	var users = require('./users.js')(db);
	var place = require('./place.js')(db);
	var mail = require('./mail.js')(db, transporter);


	var pichanga={};

	pichanga.getMyPichangasByDate = function(personId, startDate, endDate, callback){

		var publicQuery = '( ' +
			' SELECT ' +
			' P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details, P.min_assistants, P.max_assistants, '+
			' C.email, C.profile_img_url, C.name as organizator_name, '+
			' L.name as place_name, L.place_pic_url_large, L.place_pic_url_small, L.address, L.place_id, count(A.pichanga_id) as assistant_count, '+
			' L.lat, L.lng, P.layer_conversation_id, '+
			' P.pichanga_code, P.is_public, P.registration_open ' +
			' FROM pichanga P  ' +
			' LEFT JOIN person C ' +
			' ON P.organizator_id = C.person_id ' +
			' LEFT JOIN assistant A ' +
			' ON A.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN place L ' +
			' ON L.place_id = P.place_id ' +
			' WHERE P.is_public = 1 ';
		var params = [];

		// add parameters to the query

		if(personId){
			publicQuery += ' AND (A.person_id = ? OR C.person_id = ?) '
			params.push(personId);
			params.push(personId);
		}

		if(Boolean(startDate)){
			publicQuery +=  ' AND (P.start_date) >= ? ';
			params.push(startDate);
		}

		if(Boolean(endDate)){
			publicQuery +=  ' AND (P.start_date) <= ? ';
			params.push(endDate);
		}

		publicQuery +=  ' GROUP BY P.pichanga_id ' +
		'ORDER BY P.pichanga_id DESC)';

		var privateQuery = '( ' +
			' SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details, P.min_assistants, P.max_assistants, ' +
			' C.email, C.profile_img_url, C.name as organizator_name, ' +
			' L.name as place_name, L.place_pic_url_large, L.place_pic_url_small, L.address, L.place_id, count(A.pichanga_id) as assistant_count, ' +
			' L.lat, L.lng, P.layer_conversation_id, ' +
			' P.pichanga_code, P.is_public, P.registration_open ' +
			' FROM pichanga P ' +
			' LEFT JOIN crew_guest G ' +
			' ON G.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN crew_member M ' +
			' ON G.crew_id = M.crew_id ' +
			' LEFT JOIN person B ' +
			' ON M.person_id = B.person_id ' +
			' LEFT JOIN person C ' +
			' ON P.organizator_id = C.person_id ' +
			' LEFT JOIN assistant A ' +
			' ON A.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN place L ' +
			' ON L.place_id = P.place_id ' +
			' WHERE P.is_public = 0  ';

		if(personId){
			privateQuery += ' AND (A.person_id = ? OR C.person_id = ?) '
			params.push(personId);
			params.push(personId);
		}

		if(Boolean(startDate)){
			privateQuery +=  ' AND (P.start_date) >= ? ';
			params.push(startDate);
		}

		if(Boolean(endDate)){
			privateQuery +=  ' AND (P.start_date) <= ? ';
			params.push(endDate);
		}

		privateQuery +=  ' GROUP BY P.pichanga_id ' +
		'ORDER BY P.pichanga_id DESC)';

		var query = publicQuery + " UNION " + privateQuery
		console.log(query);

		db.getConnection(function(err, connection) {
			connection.query(query, params, function(err, rows) {
				if (err) {
					console.log(err)
					callback({err:err});
				}
				else {
					callback({data : rows})
				}
				connection.release();
			});
		});
	}

	pichanga.getMyPublicPichangas = function(personId, startDate, endDate, callback){

		var query = ' ' +
			' SELECT P.pichanga_id, P.*, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details, P.min_assistants, P.max_assistants, '+
			' C.email, C.profile_img_url, C.name as organizator_name, '+
			' L.name as place_name, L.place_pic_url_large, L.place_pic_url_small, L.address, L.place_id, count(A.pichanga_id) as assistant_count, '+
			' L.lat, L.lng, P.layer_conversation_id, '+
			' P.pichanga_code, P.is_public, P.registration_open ' +
			' FROM pichanga P  ' +
			' LEFT JOIN person C ' +
			' ON P.organizator_id = C.person_id ' +
			' LEFT JOIN assistant A ' +
			' ON A.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN place L ' +
			' ON L.place_id = P.place_id ' +
			' WHERE P.is_public = 1 ';

		var params = [];

		// add parameters to the query

		if(personId){
			query += ' AND (A.person_id = ? OR C.person_id = ?) '
			params.push(personId);
			params.push(personId);
		}

		if(Boolean(startDate)){
			query +=  ' AND (P.start_date) >= ? ';
			params.push(startDate);
		}

		 if(Boolean(endDate)){
		 	query +=  ' AND (P.start_date) <= ? ';
			params.push(endDate);
		 }

		query +=  ' GROUP BY P.pichanga_id ' +
		'ORDER BY P.pichanga_id DESC';

		console.log(query)

		db.getConnection(function(err, connection) {
			connection.query(query, params, function(err, rows) {
				if (err) {
					console.log(err)
					callback({err:err});
				}
				else {
					callback({data : rows})
				}
				connection.release();
			});
		});
	}

	pichanga.getMyPrivatePichangas = function(personId, startDate, endDate, callback){

		var query = ' ' +
			' SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details, P.min_assistants, P.max_assistants, ' +
			' C.email, C.profile_img_url, C.name as organizator_name, B.phone, ' +
			' L.name as place_name, L.place_pic_url_large, L.place_pic_url_small, L.address, L.place_id, count(A.pichanga_id) as assistant_count, ' +
			' L.lat, L.lng, P.layer_conversation_id, ' +
			' P.pichanga_code, P.is_public, P.registration_open ' +
			' FROM pichanga P ' +
			' LEFT JOIN crew_guest G ' +
			' ON G.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN crew_member M ' +
			' ON G.crew_id = M.crew_id ' +
			' LEFT JOIN person B ' +
			' ON M.person_id = B.person_id ' +
			' LEFT JOIN person C ' +
			' ON P.organizator_id = C.person_id ' +
			' LEFT JOIN assistant A ' +
			' ON A.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN place L ' +
			' ON L.place_id = P.place_id ' +
			' WHERE P.is_public = 0  ';

		var params = [];

		// add parameters to the query

		if(personId){
			query += ' AND (B.person_id = ? OR C.person_id = ?) '
			params.push(personId);
			params.push(personId);
		}

		if(Boolean(startDate)){
			query +=  ' AND P.start_date >= ? ';
			params.push(startDate);
		}

		 if(Boolean(endDate)){
		 	query +=  ' AND P.start_date <= ? ';
			params.push(endDate);
		 }

		query +=  ' GROUP BY P.pichanga_id ' +
		'ORDER BY P.pichanga_id DESC';

		console.log(query)

		db.getConnection(function(err, connection) {
			connection.query(query, params, function(err, rows) {
				if (err) {
					console.log(err)
					callback({err:err});
				}
				else {
					callback({data : rows})
				}
				connection.release();
			});
		});
	}

	pichanga.getPichangasByPlace = function(personId, startDate, endDate, callback){

		var query = ' ' +
			' SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details, P.min_assistants, P.max_assistants, ' +
			' C.email, C.profile_img_url, C.name as organizator_name, B.phone, ' +
			' L.name as place_name, L.place_pic_url_large, L.place_pic_url_small, L.address, L.place_id, count(A.pichanga_id) as assistant_count, ' +
			' L.lat, L.lng, P.layer_conversation_id, ' +
			' P.pichanga_code, P.is_public, P.registration_open ' +
			' FROM pichanga P ' +
			' LEFT JOIN crew_guest G ' +
			' ON G.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN crew_member M ' +
			' ON G.crew_id = M.crew_id ' +
			' LEFT JOIN person B ' +
			' ON M.person_id = B.person_id ' +
			' LEFT JOIN person C ' +
			' ON P.organizator_id = C.person_id ' +
			' LEFT JOIN assistant A ' +
			' ON A.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN place L ' +
			' ON L.place_id = P.place_id ' +
			' WHERE 1 = 1 ';

		var params = [];

		// add parameters to the query

		if(personId){
			query += ' AND (B.person_id = ? OR C.person_id = ?) '
			params.push(personId);
			params.push(personId);
		}

		if(Boolean(startDate)){
			query +=  ' AND P.start_date >= ? ';
			params.push(startDate);
		}

		if(Boolean(endDate)){
			query +=  ' AND P.start_date <= ? ';
			params.push(endDate);
		}

		query +=  ' GROUP BY P.pichanga_id ' +
		'ORDER BY P.pichanga_id DESC';

		console.log(query)

		db.getConnection(function(err, connection) {
			connection.query(query, params, function(err, rows) {
				if (err) {
					console.log(err)
					callback({err:err});
				}
				else {
					callback({data : rows})
				}
				connection.release();
			});
		});
	}



	pichanga.createPichanga = function(startDate, endDate, organizerId, pichangaName, details, minAssistants, maxAssistants, fee, placeId, crewIds, isPublic, callback) {

		db.getConnection(function(err, connection){
			connection.query( ' INSERT INTO pichanga (start_date, end_date, organizator_id, name, ' +
				' details, min_assistants, max_assistants, fee, place_id, is_public, pichanga_code) VALUES ' +
				' (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, LEFT(MD5(CURRENT_TIMESTAMP),8)) ' , [startDate, endDate, organizerId, pichangaName, details, minAssistants, maxAssistants, fee, placeId, isPublic],

				function(err, insertResult) {

					if (err) {
						console.log(err);
						callback(err);
					}
					else{

						try{

							var pichangaId = insertResult.insertId
							layer.createPichangaConversation(organizerId, pichangaName,  pichangaId, function(conversationId){
								pichanga.updateLayerConversationId(pichangaId,conversationId,function(){

								});
							});
							if(isPublic == '1') {

								console.log('part 1');

								console.log(crews);

								users.getById(organizerId, function(user){
									console.log(user);

									place.getPlaceDetail(placeId, function(place){
										var pushMessage= "Pichanga pública "+pichangaName+" ha sido creada por "+user.name+" en "+place.name;

										pushNote.pushNewPlaceNotification(pushMessage, placeId, pichangaId, function(data){
											console.log(data)
										});
									})
								});

								//backward comp.
								insertResult.me='pichanga created';
								insertResult.data = []
								callback(insertResult)
							}else{


								var crews = [];

								console.log(crewIds);
								for(var i=0; i < crewIds.length; i++){
									var tmp = [];
									var el = crewIds[i];

									tmp.push(pichangaId);
									tmp.push(el);

									crews.push(tmp);
								}

								console.log('part 1');

								console.log(crews);

								var user  = users.getById(organizerId, function(user){
									console.log(user);
									var pushMessage= "Pichanga "+pichangaName+" ha sido creada por "+user.name+". ";

									pushNote.pushNewPichangaNotification(pushMessage, crewIds, pichangaId, function(data){
										console.log(data)
									});
								});

								if(crews.length>0){ // check if it has crews assigned (private pichanga)
									connection.query( ' INSERT INTO crew_guest (pichanga_id, crew_id) VALUES ? ', [crews], function(err, rows) {
										console.log(err);
										if (err) {
											callback(err);
										}
										else {
											var mail_service = {
												pichanga_id: pichangaId
											};

											console.log(mail_service);

											mail.sendPichangaInvitation(pichangaId, pichanga, function(data){
												//res.send({
												//	me: success_messages.pichanga_created,
												//	data: []
												//});
											});

										}
									});
								}

								//backward comp.
								insertResult.me='pichanga created';
								insertResult.data = []
								callback(insertResult)
							}


							
						}
						catch(err){
							console.log(err);
							callback({me : "El crew indicado no es valido."});
						}
					}
					connection.release();

				});
		});
	};

	pichanga.updateLayerConversationId = function(pichangaId, layerConversationId, callback) {

		db.getConnection(function(err, connection){

			connection.query( 	' UPDATE pichanga SET layer_conversation_id = ? WHERE pichanga_id = ? ', [layerConversationId, pichangaId], function(err, rows) {
				if (err){
					callback(err);
				}
				else{
					callback(rows);
				}
			});
			connection.release();
		});
	};


	pichanga.getPichangaGuests = function(pichangaId, callback) {

		db.getConnection(function(err, connection){

			connection.query( 	' SELECT P.person_id, ' +
								" CONCAT(IFNULL(P.first_name,'') ,' ', IFNULL(P.last_name,'')) name, P.email, P.user, " +
								" P.first_name, " +
								" P.last_name" +
							  	' FROM person P ' +
							  	' LEFT JOIN crew_member M ' +
							  	' ON M.person_id = P.person_id ' +
						 	 	' LEFT JOIN crew_guest G ' +
							  	' ON G.crew_id = M.crew_id ' +
							  	' LEFT JOIN pichanga S ' +
						  		' ON S.pichanga_id = G.pichanga_id ' +
							  	' WHERE 1 = 1 ' +
							  	' AND S.pichanga_id = ? ' +
							  	' GROUP BY P.person_id ', [pichangaId], function(err, rows) {
					if (err){
						callback(err);
					}
					else{
						callback(rows);
					}
				});
			connection.release();
		});
	};

	pichanga.getPichangaCrews = function(pichangaId, callback){
		console.log('pichanga.getPichangaCrews', arguments)

		db.getConnection(function(err, connection){

			connection.query(' SELECT C.* ' +
			' FROM pichanga P ' +
			' JOIN crew_guest CG USING (pichanga_id)' +
			' JOIN crew C USING(crew_id) ' +
			' WHERE pichanga_id = ?', [pichangaId], function(err, rows) {

				if (err) {
					callback(err);
				}
				else {
					console.log('pichanga.getPichangaCrews result ', rows[0])
					callback(rows || []);
				}

				connection.release();
			});

		});
	}

	pichanga.getPichangaInfoByCode = function(pichangaCode, callback){

		console.log('pichanga.getPichangaInfoByCode', arguments)

		db.getConnection(function(err, connection){

			connection.query( 	' SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details, ' +
			' CONCAT(IFNULL(B.first_name,\'\'),\' \',IFNULL(B.last_name,\'\')) as organizer_name, ' +
			' B.profile_img_url as organizer_img, B.email, B.phone, P.min_assistants, P.max_assistants, count(C.person_id) as assistant_count,' +
			' pl.lat, pl.lng, pl.name as place_name, pl.place_id, P.layer_conversation_id' +
			' FROM pichanga P ' +
			' LEFT JOIN assistant C ' +
			' ON C.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN person B ' +
			' ON P.organizator_id = B.person_id ' +
			' JOIN place pl USING(place_id)' +
			' WHERE P.pichanga_code = ? ' +
			' GROUP BY P.pichanga_id  ', [pichangaCode], function(err, rows) {

				if (err) {
					callback(err);
				}
				else {
					console.log('pichanga.getPichangaInfo result ', rows[0])
					callback(rows[0] || []);
				}

				connection.release();
			});
		});
	};

	pichanga.getPichangaInfoById = function(pichangaId, callback){

		console.log('pichanga.getPichangaInfo', pichangaId)

		db.getConnection(function(err, connection){

			connection.query( 	' SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details, ' +
								' B.name as organizator_name, B.email, B.phone, P.min_assistants, P.max_assistants, ' +
								' count(C.person_id) as assistant_count,' +
								' pl.lat, pl.lng, pl.name as place_name, pl.place_id, P.layer_conversation_id, P.registration_open ' +
								' FROM pichanga P ' +
								' LEFT JOIN assistant C ' +
								' ON C.pichanga_id = P.pichanga_id ' +
								' LEFT JOIN person B ' +
								' ON P.organizator_id = B.person_id ' +
								' JOIN place pl USING(place_id)' +
								' WHERE P.pichanga_id = ? ' +
								' GROUP BY P.pichanga_id  ', [pichangaId], function(err, rows) {

				if (err) {
					callback(err);
				}
				else {
					console.log('pichanga.getPichangaInfo result ', rows[0])
					callback(rows[0] || []);
				}

				connection.release();
		    });

		});
	};

	pichanga.getPichangaInfoByConversationId = function(layerConversationId, callback){

		console.log('pichanga.getPichangaInfo', arguments)

		db.getConnection(function(err, connection){

			connection.query( 	' SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, P.details, ' +
			' B.name as organizator_name, B.email, B.phone, P.min_assistants, P.max_assistants, count(C.person_id) as assistant_count,' +
			' pl.lat, pl.lng, pl.name as place_name, pl.place_id, P.layer_conversation_id' +
			' FROM pichanga P ' +
			' LEFT JOIN assistant C ' +
			' ON C.pichanga_id = P.pichanga_id ' +
			' LEFT JOIN person B ' +
			' ON P.organizator_id = B.person_id ' +
			' JOIN place pl USING(place_id)' +
			' WHERE P.layer_conversation_id = ? ' +
			' GROUP BY P.pichanga_id  ', [layerConversationId], function(err, rows) {

				if (err) {
					console.err(err)
					callback(err);
				}
				else {
					console.log('pichanga.getPichangaInfo result ', rows[0])
					callback(rows[0] || []);
				}

				connection.release();
			});

		});

	};

	pichanga.getActivePichangas = function(person_id, callback){

		db.getConnection(function(err, connection){

			connection.query( 	' SELECT P.pichanga_id, P.name, P.start_date, P.end_date, P.fee, P.pay_mode, P.organizator_id, ' + 
								' P.details, P.min_assistants, P.max_assistants, ' +
								' C.email, C.profile_img_url, B.phone, L.name as place_name, C.name as organizator_name, ' +
								' count(A.pichanga_id) as assistant_count, L.lat, L.lng,  P.layer_conversation_id ' +
								' FROM pichanga P ' +
								' LEFT JOIN crew_guest G ' +
								' ON G.pichanga_id = P.pichanga_id ' +
								' LEFT JOIN crew_member M ' +
								' ON G.crew_id = M.crew_id ' +
								' LEFT JOIN person B ' +
								' ON M.person_id = B.person_id ' +
								' LEFT JOIN person C ' +
								' ON P.organizator_id = C.person_id ' +
								' LEFT JOIN assistant A ' +
								' ON A.pichanga_id = P.pichanga_id ' +
								' LEFT JOIN place L ' +
								' ON L.place_id = P.place_id ' +
								' WHERE 1 = 1 ' +
								' AND B.person_id = ? ' +
								' AND P.end_date > DATE_SUB(NOW(), INTERVAL 60 DAY) ' +
								' GROUP BY P.pichanga_id ' +
								' ORDER BY P.pichanga_id DESC ' , [person_id], function(err, rows) {

				if (err) {
					console.err(err)
					callback(err);
				}
				else {
					callback(rows);
				}

				connection.release();
		    });
		});
	};

	pichanga.getAllPichangas = function(callback){

		db.getConnection(function(err, connection){

			connection.query(' SELECT pi.*, CONCAT(pe.first_name, \' \', pe.last_name) as organizer_name, pe.email as organizer_email, pl.name as place_name ' +
			' ,(SELECT count(*) from assistant WHERE pichanga_id = pi.pichanga_id) as player_count ' +
			' FROM pichanga pi ' +
			' JOIN person pe ON ( pi.organizator_id = pe.person_id ) ' +
			' JOIN place pl USING(place_id) ' +
			' ORDER BY pi.pichanga_id DESC ' , [], function(err, rows) {

				if (err) {
					console.log(err)
					callback(err);
				}
				else {
					callback(rows);
				}

				connection.release();
			});
		});
	};

	pichanga.getAllPichangasByPlaceId = function(placeId, callback){

		db.getConnection(function(err, connection){

			connection.query( 	' SELECT pi.*, pe.email as organizer_email, pl.name as place_name,  ' +
			' (SELECT count(*) from assistant WHERE pichanga_id = pi.pichanga_id) as player_count ' +
			' FROM pichanga pi ' +
			' JOIN person pe ON ( pi.organizator_id = pe.person_id ) ' +
			' JOIN place pl USING(place_id) ' +
			' WHERE pi.place_id = ?' +
			' ORDER BY pi.pichanga_id DESC ' , [placeId], function(err, rows) {

				if (err) {
					console.log(err)
					callback(err);
				}
				else {
					callback(rows);
				}

				connection.release();
			});
		});
	};

	pichanga.changeRegistrationOpen = function(pichangaId, open, callback){
		db.getConnection(function(err, connection) {

			connection.query(' UPDATE pichanga set ' +
				' registration_open = ? ' +
				' WHERE pichanga_id = ?', [open, pichangaId], function (err, res) {

				callback(res)
				connection.release();
			});
		})
	}

	pichanga.updatePichanga = function (pichangaId, startDate, placeId, crewIds, callback) {
		db.getConnection(function(err, connection){
			connection.query( ' UPDATE pichanga set ' +
				' start_date = ?, ' +
				' place_id = ? ' +
				' WHERE pichanga_id = ?' , [startDate, placeId, pichangaId],

				function(err, updateResult) {

					if (err) {
						res.send({error: err});
					}
					else{
						try{

							var crews = [];

							console.log(crewIds);
							if(crewIds){
								for(var i=0; i < crewIds.length; i++){
									var tmp = [];
									var el = crewIds[i];

									tmp.push(pichangaId);
									tmp.push(el);

									crews.push(tmp);
								}
								if(crews.length > 0){
									connection.query( ' DELETE FROM crew_guest WHERE pichanga_id = ? ', [pichangaId], function(err, rows) {
										console.log(err);
										if (err) {
											res.send(err);
										}
										else {
											connection.query( ' INSERT INTO crew_guest (pichanga_id, crew_id) VALUES ? ', [crews], function(err, res2) {
												console.log(err);
												if (err) {
													res.send(err);
												}
												else {
													//callback(res2)
												}
											});
										}
									});
								}else{

								}
							}
							updateResult.me='pichanga updated';
							updateResult.data = []
							callback(updateResult)

						}
						catch(err){
							console.log(err);
							res.send({me : "El crew indicado no es valido."});
						}
					}
					connection.release();

				});
		});

	}


	pichanga.getPichangasAssistants = function(pichangaId, callback){

		db.getConnection(function(err, connection){
			connection.query( " SELECT A.pichanga_id, B.person_id, B.profile_img_url, " +
			"CONCAT(IFNULL(B.first_name,'') ,' ', IFNULL(B.last_name,'')) name, B.first_name, IFNULL(B.last_name,'') as last_name, B.email, A.comment, A.payment " +
			' FROM assistant A, person B ' +
			' WHERE A.pichanga_id = ? ' +
			' AND A.person_id = B.person_id ' +
			' ORDER BY RAND() ', [pichangaId], function(err, rows) { //TODO ORDER BY RAND()

				if (err) {
					console.log(err)
					callback({
						error: err
					});
				}
				else {
					callback(rows);
				}
				connection.release();
			});
		});
	};

	return pichanga;
};

