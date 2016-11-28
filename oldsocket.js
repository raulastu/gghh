io.on('connection', function (socket) {
	console.log('connectado a socket');

	console.log('handshake', socket.handshake.headers);
	var decoded = jwt.verify(socket.handshake.query.token, jwtSecret);
	console.log('***** decoded', decoded);


	//console.log('connecting', socket.id, socket);
	var user_in_socket = false; // user is connected to the socket
	var user_in_room = false; //user is connected to a room

	sockets.push(socket.id);
	console.log('adding new socket')
	// when the client emits 'add user', this listens and executes
	socket.on('add user', function (data) {
		
		chat.chat_info(data.pichanga_id, data.user, function(resp){

			user_in_room = true;

			console.log('user in: ', data.user);

			// we store the username in the socket session for this client
			// socket.username = data.user; //username: Pancho Vilchez
			socket.username = resp.name;
			socket.connection_id = user_online++;

			console.log('user in id: ', socket.connection_id);

			// console.log(socket.username);
			
			// console.log(resp);

			// add the client's username to the global list
			user_data[socket.connection_id] = {};

			// console.log('db ', resp.name);

			user_data[socket.connection_id].name = resp.name;
			user_data[socket.connection_id].email = resp.email;
			user_data[socket.connection_id].room_id = resp.pichanga_id;
			user_data[socket.connection_id].person_id = resp.person_id;
			user_data[socket.connection_id].room_name = resp.pichanga_name;

			socket.join(user_data[socket.connection_id].room_id);

			// console.log(user_data);

			if(user_room_count[user_data[socket.connection_id].room_id] == undefined){
				user_room_count[user_data[socket.connection_id].room_id] = 1;
			}
			else{
				++user_room_count[user_data[socket.connection_id].room_id];
			}

			user_in_socket = true;

			chat.allHistory(user_data[socket.connection_id].person_id, user_data[socket.connection_id].room_id, function(data){
				// console.log(data);

				socket.emit('login', {
					user_room_count: user_room_count[user_data[socket.connection_id].room_id],
					history: data
				});

				// echo globally (all clients) that a person has connected
				socket.to(user_data[socket.connection_id].room_id).broadcast.emit('user joined', {
					username: user_data[socket.connection_id].name,
					email: user_data[socket.connection_id].email,
					user_room_count: user_room_count[user_data[socket.connection_id].room_id]
				});

				chat.updateLastConnection(user_data[socket.connection_id].person_id, user_data[socket.connection_id].room, function(){
					console.log('callback updateLastConnection');
				});
			});
		});
	});


	// console.log(socket)
	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		console.log('getting message');

		var sent_date = new Date();

		console.log(data);
		// we tell the client to execute 'new message'
		var name = user_data[socket.connection_id].name;
		var connectedPersonId = user_data[socket.connection_id].person_id;
		var pichangaId = data['pichanga_id'];
		var message = data['msg'];


		console.log('user: ', user_data[socket.connection_id].name);
		console.log('room: ', pichangaId);

		socket.to(user_data[pichangaId]).broadcast.emit('new message', {
			username: name,
			email: user_data[socket.connection_id].email,
			message: message ,
			user: name,
			room: pichangaId,
			room_name: user_data[socket.connection_id].room_name,
			sent_date: sent_date
		});


		// socket.broadcast.emit('notification message', {
		// 	username: user_data[socket.connection_id].name,
		// 	email: user_data[socket.connection_id].email,
		// 	user: user_data[socket.connection_id].name,
		// 	room: user_data[socket.connection_id].room_id,
		// 	room_name: user_data[socket.connection_id].room_name,
		// 	message: data,
		// 	sent_date: sent_date
		// });

		chat.insertMessage(data, user_data[socket.connection_id].room_id, connectedPersonId, function(){
			console.log('chat.insertMessage 200');
		});

		pushUtils.sendChannelNotification(connectedPersonId, name, message, pichangaId, function(data){
			console.log(data);
		})

	});

	socket.on('logoutroom', function(){
		// remove the username from global usernames list
		if (user_in_socket) {
			user_in_room = false;
			socket.leave(user_data[socket.connection_id].room_id);
			--user_room_count[user_data[socket.connection_id].room_id];

			chat.updateLastConnection(user_data[socket.connection_id].person_id, user_data[socket.connection_id].room_id, function(){
				console.log('callback updateLastConnection');
			});

			// echo globally that this client has left
			socket.to(user_data[socket.connection_id].room_id).broadcast.emit('user left', {
				username: user_data[socket.connection_id].name,
				email: user_data[socket.connection_id].email,
				user_room_count: user_room_count[user_data[socket.connection_id].room_id]
			});
		}
	});

	socket.on('typing', function () {
		socket.to(user_data[socket.connection_id].room_id).broadcast.emit('typing', {
			username: user_data[socket.connection_id].name,
			email: user_data[socket.connection_id].email
		});
	});

	// when the client emits 'stop typing', we broadcast it to others
	socket.on('stop typing', function () {
		socket.to(user_data[socket.connection_id].room_id).broadcast.emit('stop typing', {
			username: user_data[socket.connection_id].name,
			email: user_data[socket.connection_id].email
		});
	});

	socket.on('logout', function(){
		// remove the username from global usernames list
		if (user_in_socket) {
			socket.disconnect('unauthorized');
		}
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function (data) {
		console.log('disconnect', data);
		// remove the username from global usernames list
		if(user_in_room){
			socket.leave(user_data[socket.connection_id].room_id);
			--user_room_count[user_data[socket.connection_id].room_id];

			chat.updateLastConnection(user_data[socket.connection_id].person_id, user_data[socket.connection_id].room_id, function(){
				console.log('callback updateLastConnection');
			});

			// echo globally that this client has left
			socket.to(user_data[socket.connection_id].room_id).broadcast.emit('user left', {
				username: user_data[socket.connection_id].name,
				email: user_data[socket.connection_id].email,
				user_room_count: user_room_count[user_data[socket.connection_id].room_id]
			});
		}

		if (user_in_socket) {
			delete user_data[socket.connection_id]; // TODO uncomment

			socket.disconnect('unauthorized');
		}
	});
});
