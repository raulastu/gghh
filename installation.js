module.exports = function(db) {
  	var installation={};


	installation.getInstallationsByPersonId = function(personId, callback) {
		console.log('getInstallationsByPersonId', arguments);
		// var allusers = data; // Spoof a DB call
		db.getConnection(function(err, connection){
			connection.query(
				" SELECT installation_id, device_type, device_token, registration_datetime, platform " +
				" FROM parse_installation " +
				' WHERE person_id = ? ', [personId],
				function(err, rows) {

					if (err){
						callback(err);
					}
					else{
						console.log('getInstallationsByPersonId.result',rows);

						callback(rows || {});
					}
				});
			connection.release();
		});
	};

	installation.addInstallation = function(personId, installationId, deviceType, platform, deviceToken, callback) {
		console.log('updateLastLogin ', arguments)
		// var allusers = data; // Spoof a DB call
		db.getConnection(function(err, connection){
			connection.query(
				' INSERT INTO parse_installation (person_id, installation_id, device_type, platform, device_token, registration_datetime) ' +
				' VALUES (?,?,?,?,?, CURRENT_TIMESTAMP() ) ' +
				' ON DUPLICATE KEY UPDATE ' +
				' device_token = VALUES(device_token), '+
				' platform = VALUES(platform), ' +
				' device_type = VALUES(device_type), '+
				' registration_datetime = VALUES(registration_datetime) ', [personId, installationId, deviceType, platform, deviceToken],
				function(err, rows) {

					if (err){
						callback(err);
					}
					else{
						console.log('addInstallation',rows[0]);
						callback(rows[0] || {});
					}
				});
			connection.release();
		});
	};
	return installation;
};

