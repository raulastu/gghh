module.exports = function(db) {
	var crew = {};

	crew.getAllCrews = function( callback){

		db.getConnection(function(err, connection){

			var query = ' SELECT ' +
				' crew_id, c.owner_id, CONCAT(p.first_name, \' \',p.last_name) owner, c.name, ( SELECT count(*) FROM crew_member WHERE crew_id = c.crew_id ) member_count ,' +
				' c.registration_datetime, c.registration_origin ' +
				' FROM crew c join person p ON (c.owner_id = p.person_id) ORDER BY c.crew_id DESC';

			connection.query(query ,[],
				function(err, rows) {
					if (err) {
						callback({me: err});
					}
					else {
						callback(rows);
					}
					connection.release();
				});
		});
	}



	crew.addNewCrew = function(personId, name, origin, callback){
		db.getConnection(function(err, connection){
			connection.query( ' INSERT INTO crew (owner_id, name, registration_origin) VALUES (?, ?, ?)', [personId, name, origin],
				function(err, result) {
					if (err) {
						console.err(err);
						callback({me: err});
					}
					else {
						crew.addCrewMember(result.insertId, personId, personId, function(data){
							//if()
							callback({crew_id:result.insertId});
						});
					}
					connection.release();
				});
		});
	}


	crew.getCrewsByMember = function(personId, extraQuery,  callback){
		console.log('getCrewsByMember ', arguments)

		db.getConnection(function(err, connection){

			var query = ' SELECT crew_id, crew_id as id, owner_id, name, name as text, ( SELECT count(*) FROM crew_member WHERE crew_id = c.crew_id ) member_count ' +
				' FROM crew c JOIN crew_member USING (crew_id) WHERE person_id = ? ';

			var query_string = "";

			if(extraQuery){
				query_string = '%' + extraQuery + '%';
				query += ' AND name like ? ';
			}

			connection.query(query ,[personId, query_string],
				function(err, rows) {
					if (err) {
						callback({me: err});
					}
					else {
						console.log('getCrewsByMember',rows);
						callback(rows);
					}
					connection.release();
				});
		});
	}

	crew.getCrewsByMember = function(personId, extraQuery, callback){
		console.log('getCrewsByMember ', arguments)

		db.getConnection(function(err, connection){

			var query = ' SELECT crew_id, crew_id as id, owner_id, name, name as text, ( SELECT count(*) FROM crew_member WHERE crew_id = c.crew_id ) member_count ' +
				' FROM crew c JOIN crew_member USING (crew_id) WHERE person_id = ? ';

			var query_string = "";

			if(extraQuery){
				query_string = '%' + extraQuery + '%';
				query += ' AND name like ? ';
			}

			connection.query(query ,[personId, query_string],
				function(err, rows) {
					if (err) {
						callback({me: err});
					}
					else {
						console.log('getCrewsByMember',rows);
						callback(rows);
					}
					connection.release();
				});
		});
	}

	crew.getCrewInfoById = function(crewId, callback){

		db.getConnection(function(err, connection){

			connection.query( 	' SELECT c.crew_id, c.owner_id, c.name FROM crew c WHERE c.crew_id = ? ', [crewId], function(err, crew) {
				if (err) {
					callback({me: err});
				}
				else {
					callback(crew[0] || {});
				}
				connection.release();
			})
		});
	};

	crew.getCrewMembers = function(crewId, callback){

		db.getConnection(function(err, connection) {

			connection.query(" SELECT cm.crew_id, p.person_id, p.profile_img_url,  CONCAT(IFNULL(p.first_name,'') ,' ', IFNULL(p.last_name,'')) name FROM crew_member cm JOIN person p " +
			' USING (person_id) WHERE cm.crew_id = ? ', [crewId], function (err, members) {
				if (err) {
					callback({me: err});
				}
				else {
					callback(members);
				}
				connection.release();
			});
		});
	};
	crew.getCrewById = function(crewId, callback){

		crew.getCrewInfoById(crewId, function(crewResult){
			console.log('crewResult', crewResult);
			console.log('crewResult.owner', crewResult.owner_id);

			crew.getCrewMembers(crewId, function (members){
				console.log('members',members);
				callback({
					crew_id: crewResult.crew_id,
					owner_id: crewResult.owner_id,
					name: crewResult.name,
					members: members
				});
			});
		})
	};
	
	crew.addCrewMember = function (crewId, inviterPersonId, invitedPersonId, callback) {
		console.log('addCrewMember', crewId, inviterPersonId, invitedPersonId);

		db.getConnection(function(err, connection){

			crew.getCrewById(crewId, function(crew){
				console.log('crew', crew)
				var inCrew = false;

				if(inviterPersonId = crew.owner_id){
					inCrew = true;
				}else{
					for(var i=0; i< crew.members.length; i++){
						var item = crew.members[i];
						if(inviterPersonId == item.person_id){
							inCrew = true
							break;
						}
					}
				}


				if(inCrew){
					connection.query( ' INSERT INTO crew_member (person_id, crew_id) VALUES (?, ?) ', [invitedPersonId, crewId],
					  function(err, rows) {

						if (err) {
							if(err.errno == 1062){
								err.me = "User si already member of the crew";
							}

							callback(err);
						}
						else {
							callback(rows);
						}

						connection.release();
					});	
				}
				else{
					callback({me: "Sorry, you are not allowed to invite anyone to this crew"});
				}

			});

		});
	};

	return crew;
}