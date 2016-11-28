var WORLD_CREATION_DATETIME = "1980-12-08 23:59:59.59";
module.exports = function(db) {
  var chat={};
  chat.allHistory = function(personId, roomId, callback) {
	  	try{
			console.log('chat.allHistory',personId,roomId)
		    // var allusers = data; // Spoof a DB call
		    db.getConnection(function(err, connection) {
			    connection.query( " SELECT A.room_id, A.person_id, A.message, A.sent_date, (A.sent_date < B.last_connection) as seen, CONCAT(IFNULL(P.first_name,'') ,' ', IFNULL(P.last_name,'')) as name, P.email " +
			                      ' FROM chat_line A, ( ' +
			                      '   SELECT ( IF (count(*)=0, ?, last_connection) ) as last_connection ' +
			                      '   FROM connection_history ' +
			                      '   WHERE room_id = ? ' +
			                      '   AND person_id = ? ) B, person P ' +
			                      ' WHERE A.room_id = ? ' + 
			                      ' AND A.person_id = P.person_id ', 
			                      [WORLD_CREATION_DATETIME, roomId, personId, roomId], 
			                       function(err, rows) {
			      if (err) {
			      	callback(err)
			      }
			      else{
			        callback(rows)
			      }
			    });
			    connection.release();
			});
	  	}catch(e){
	  		console.error(e);
	  	}
  }

  chat.updateLastConnection = function(personId, roomId, callback){
  	db.getConnection(function(err, connection) {
	    connection.query( ' INSERT INTO connection_history (room_id, person_id, last_connection) ' +
	                      ' VALUES (?, ?, current_timestamp() ) ' +
	                      ' ON DUPLICATE KEY UPDATE ' +
	                      ' last_connection = current_timestamp() ', [roomId, personId], function(err, rows) {
	      if (err) {
	        callback(err)
	      }
	      else{
	        console.log(rows);
	        callback(rows)
	      }      
	    });
	    connection.release();
	  });
  }

  chat.insertMessage = function(message, roomId, personId, callback){
  	db.getConnection(function(err, connection) {
	    connection.query(' INSERT INTO chat_line (sent_date, message, room_id, person_id) ' +
	                     ' VALUES (current_timestamp(), ?, ?, ?) ' , 
	                 	[message, roomId, 
	                 	personId], function(err, rows) {
	      if (err) {
	        callback(err)
	      }
	      else{
	        callback(rows)
	      }      
	    });
	    connection.release();
	  });
  }

  chat.chat_info = function(room_id, email, callback){
  	db.getConnection(function(err, connection){
  		connection.query(	" SELECT CONCAT(IFNULL(P.first_name,'') ,' ', IFNULL(P.last_name,'')) as name, P.person_id, M.name as pichanga_name, M.pichanga_id, P.email " +
							' FROM person P, pichanga M ' +
							' WHERE P.email = ? ' +
							' AND M.pichanga_id = ? ', [email, room_id], function(err, rows){
  			if (err) {
  				callback(err);
  			}
  			else {
  				callback(rows[0]);
  			}
  		});
  		connection.release();
  	});
  }

  return chat;
};