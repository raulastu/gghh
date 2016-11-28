module.exports = function(db) {
  	var users={};

	users.searchUsers = function(verified, token, q, callback){

		var query = " SELECT B.person_id, B.email, " +
			" CONCAT(IFNULL(B.first_name,'') ,' ', IFNULL(B.last_name,'')) name, " +
			" B.first_name, " +
			" B.last_name, " +
			" B.registration_datetime, " +
			" B.registration_origin, " +
			" B.lastlogin_datetime," +
			" B.lastlogin_origin, " +
			" B.profile_img_url, " +
			" B.last_lat, " +
			" B.last_lng, " +
			" B.country, " +
			" B.country_code, " +
			" B.city, " +
			" B.phone, B.user, count(C.person_id) as pichanga_count, D.token " +
			' FROM person B ' +
			' LEFT JOIN assistant C ' +
			' ON C.person_id = B.person_id ' +
			' LEFT JOIN login D ' +
			' ON D.email = B.email ' +
			' WHERE 1 = 1 ';


		var params = [];

		if(verified){
			query += ' AND D.verified = ? ';
			params.push(verified);
		}
		else{
			query += ' AND D.verified = TRUE ';
		}

		if(token){
			query += ' AND D.token = ? ';
			params.push(token);
		}

		if(q){
			query += " AND CONCAT(IFNULL(B.first_name,'') ,' ', IFNULL(B.last_name,'')) like ?";
			params.push('%'+q+'%');
			params.push('%'+q+'%');
		}

		query +=  ' GROUP BY B.person_id ' +
		' ORDER BY B.registration_datetime DESC ';

		//query = mysql_real_escape_string(query);
		console.log(query);
		console.log(params);

		db.getConnection(function(err, connection){
			connection.query(query, params, function(err, rows) {

				if (err){
					callback({me:err});
				}
				else{
					callback(rows);
				}

			});
			connection.release();
		});
	}

	users.updateLastLogin = function(personId, origin, callback) {
		console.log('updateLastLogin ',personId, origin)
		// var allusers = data; // Spoof a DB call
		db.getConnection(function(err, connection){
			connection.query(
				" UPDATE person SET " +
				" lastlogin_datetime = CURRENT_TIMESTAMP(), " +
				" lastlogin_origin = ? " +
				" WHERE person_id = ?",[origin, personId],
				function(err, rows) {

					if (err){
						callback(error);
					}
					else{
						console.log('updateLastLogin.result',rows[0]);

						callback(rows[0] || {});
					}
				});
			connection.release();
		});
	};

	function functionName(fun) {
		var ret = fun.toString();
		ret = ret.substr('function '.length);
		ret = ret.substr(0, ret.indexOf('('));
		return ret;
	}

	users.getById = function(personId, callback) {
		var name = functionName(this);
		console.log('users.getById', arguments);
		// var allusers = data; // Spoof a DB call
		db.getConnection(function(err, connection){
			connection.query(
				" SELECT B.person_id, B.email, CONCAT(IFNULL(B.first_name,'') ,' ', IFNULL(B.last_name,'')) as name , B.phone, B.user, A.team_id, A.name as team_name, count(C.person_id) as pichanga_count, D.token, B.profile_img_url " +
				" FROM person B " +
				' LEFT JOIN team A ' +
				' ON A.team_id = B.team_id ' +
				' LEFT JOIN assistant C ' +
				' ON C.person_id = B.person_id ' +
				' LEFT JOIN login D ' +
				' ON D.email = B.email ' +
				' WHERE B.person_id = ? ', [personId],
				function(err, rows) {

					if (err){
						callback(error);
					}
					else{
						console.log('users.getById result',rows[0]);

						callback(rows[0] || {});
					}
				});
			connection.release();
		});
	};




	users.getByEmail = function(email, callback) {
		console.log('getByEmail',email)
		// var allusers = data; // Spoof a DB call
		db.getConnection(function(err, connection){
			connection.query( 
				" SELECT B.person_id, B.email, CONCAT(IFNULL(B.first_name,'') ,' ', IFNULL(B.last_name,'')) as name , " +
				" B.first_name, IFNULL(B.last_name,'') as last_name, B.phone, B.user, A.team_id, A.name as team_name, count(C.person_id) as pichanga_count, D.token, B.profile_img_url " +
							  " FROM person B " +
							  ' LEFT JOIN team A ' +
							  ' ON A.team_id = B.team_id ' +
							  ' LEFT JOIN assistant C ' +
							  ' ON C.person_id = B.person_id ' +
							  ' LEFT JOIN login D ' +
							  ' ON D.email = B.email ' +
							  ' WHERE B.email = ? ' +
							  ' GROUP BY B.person_id ', [email.toLowerCase()], 
							  function(err, rows) {

				  if (err){
					callback(err);
				  }
				  else{
					  console.log('getByEmail.result',rows[0]);

					  callback(rows[0] || {});
				  }
				});
			connection.release();
		});
	};

	users.updateUserImageURL = function(person_id, profileImgUrl, callback){
		console.log('updateUserImageURL', person_id, profileImgUrl)
		// var allusers = data; // Spoof a DB call
		db.getConnection(function(err, connection){
			connection.query(
				' UPDATE person SET ' +
				' profile_img_url = ? ' +
				' WHERE person_id = ? '
				, [profileImgUrl, person_id],
				function(err, rows) {
					if (err){
						callback(err);
					}
					else{
						callback(rows[0] || {});
					}
				});
			connection.release();
		});
	}

	users.updateFBUser = function(personId, fbId, firstName, lastName, email, updatedTime, callback) {
		console.log('updateFBUser', personId, fbId, firstName, lastName, email, updatedTime)
		// var allusers = data; // Spoof a DB call
		db.getConnection(function(err, connection){
			connection.query(
				' INSERT INTO fb_user (person_id, fb_id, first_name, last_name, email, updated_time) ' +
				' VALUES (?,?,?,?,?,?)' +
				' ON DUPLICATE KEY UPDATE ' +
				' first_name = VALUES(first_name) ,'+
				' last_name = VALUES(last_name) ,'+
				' email = VALUES(email) ,'+
				' updated_time = VALUES(updated_time) '
				, [personId, fbId, firstName, lastName, email, updatedTime],
				function(err, rows) {
					if (err){
						callback(err);
					}
					else{
						console.log('updateFBUser.result', rows[0]);
						callback(rows[0] || {});
					}
				});
			connection.release();
		});
	};

	users.insertLogin = function(email, pass, token, callback){
		console.log('insertLogin');

		db.getConnection(function(err, connection){
			connection.query( ' INSERT INTO login (email, pass, verified, token) ' +
												' VALUES (?, MD5(?), ?, ?) ', [email.toLowerCase(), pass, false, token], function(err, rows) {
					console.log(err);
					if (err) {
						callback({
							error: err,
							me: 'Invalid User'
						});
					}
					else{
						callback({
							data: []
						})
					}
			});
			connection.release();
		});
	};

	users.insertPerson = function(firstName, lastName, email, profileImgUrl, registrationOrigin, callback){
		db.getConnection(function(err, connection){
			connection.query( ' INSERT INTO person (first_name, last_name, email, profile_img_url, registration_origin, registration_datetime) ' +
			' VALUES (?, ?, ?, ?, ?, NOW()) ', [firstName, lastName, email, profileImgUrl, registrationOrigin] , function(err, rows) {

				console.log('registerNewUser.result', err, rows);

				if(err){
					callback(false, err);
				}else{
					console.log('registerNewUser.result', rows.insertId);
					callback(true, rows || {});
				}
			});
			connection.release();
		});
	};


	users.registerNewUser = function (firstName, lastName, email, profileImgUrl, registrationOrigin, callback){
		console.log('registerNewUser', firstName, lastName, email, profileImgUrl, registrationOrigin);

		db.getConnection(function(err, connection){
			connection.query( ' INSERT INTO login (email, verified) ' +
			' VALUES (?,1) ', [email] , function(err, rows) {

				console.log('registerNewUser.login.result', err, rows);

				if(err){
					callback(err)
				}else{

					db.getConnection(function(err, connection){
						connection.query( ' INSERT INTO person (first_name, last_name, email, profile_img_url, registration_origin, lastlogin_origin, registration_datetime, lastlogin_datetime) ' +
						' VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()) ', [firstName, lastName, email, profileImgUrl, registrationOrigin, registrationOrigin] , function(err, rows) {

							console.log('registerNewUser.result', err, rows);

							if(err){
								console.err(err)
								callback(err)
							}else{
								console.log('registerNewUser.result', rows.insertId);
								callback(rows || {})
							}
						});
						connection.release();
					});
				}
			});
			connection.release();
		});
	}

	users.getPichangasByAssistantEmail = function(email, callback){
		db.getConnection(function(err, connection){
			connection.query( 
				' SELECT pichanga_id FROM '+
				' pichanga p JOIN '+
				' assistant a using(pichanga_id) '+
				' JOIN person pe using(person_id) '+
				' WHERE pe.email = ?', [email.toLowerCase()], function(err, rows) {

				if (err){
					callback(err);
				}
				else{
					callback(rows || {});
				}
			});
			connection.release();
		});
	};

	users.getToken = function(email, callback){
		var token = "";
		var victim = email;

		for(var i = 0; i < victim.length; i++){
			token += victim.charCodeAt(i).toString(16);
		}

		callback({token: token});
	};

	users.queryUsers = function(query, callback){
		db.getConnection(function(err, connection){
			connection.query( 
				' SELECT person_id, name, profile_img_url FROM '+
				' person p ', [], function(err, rows) {

				if (err){
					callback(err);
				}
				else{
					callback(rows || {});
				}
			});
			connection.release();
		});
	}

	users.checkIfUserHasPublicPichanga = function(userId, callback){
		db.getConnection(function(err, connection){
			connection.query(
				' select * ' +
				' FROM pichanga WHERE organizator_id = ? AND is_public = 1 AND start_date >= CONVERT_TZ(NOW(),\'+00:00\',\'-4:00\')', [userId], function(err, rows) {

					if (err){
						callback(err);
					}
					else{
						callback(rows || {});
					}
				});
			connection.release();
		})
	}


	users.registrationsByDate = function(callback){
		db.getConnection(function(err, connection){
			connection.query(
				' select DATE(registration_datetime) as date, count(*) users_registered'+
				' FROM person group by DATE(registration_datetime) order by 1 DESC', [], function(err, rows) {

					if (err){
						callback(err);
					}
					else{
						callback(rows || {});
					}
				});
			connection.release();
		});
	}

	return users;
};

