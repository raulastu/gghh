
module.exports = function(db) {
	var users = require('./users.js')(db)
	var installation = require('./installation.js')(db)
	var rest = require('rest')
	var parseUrl = "https://api.parse.com/1"
	var parseAppId = "v4FbuD3PzjPk9km3ZitzOGPTnkpft3R0Z6M4pvF4"
	var parseRestApiKey = "lwlOefH7OTLpldS9eYSx5xj0MNYRbEP2zoQKoVgA"
	var FCMApiKey = "AIzaSyDmZWqCioycoW4yTC5sLclDsNxJTTrHewA";
	var ret = {};
	console.log("push_utils exports")

	ret.subscribeToCrewChannels = function(personId, crewIdArray, callback) {
		try{
			console.log('subscribeToCrewChannels',arguments);

			installation.getInstallationsByPersonId(personId, function(data){
				for(var i = 0; i<data.length; i++){
					var installationId = data[i]['installation_id'];
					var deviceToken =data[i]['device_token'];
					var deviceType = data[i]['device_type'];

					//"deviceType": "ios",
					//	"deviceToken": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",

					var channels = [];
					for(var j = 0; j < crewIdArray.length ; j++){
						var id = crewIdArray[j].crew_id;
						channels.push('ch_crew_'+id);
					}

					if(deviceType == 'fcm' ){
						for(var i = 0; i<channels.length; i++){
							var topicName = channels[i];
							var url  = 'https://iid.googleapis.com/iid/v1/'+deviceToken+'/rel/topics/'+topicName;
							console.log('subscribing to '+topicName)
							rest({
								method:"POST",
								path:url,
								headers:{
									"Authorization": "key="+FCMApiKey,
									"Content-Type":"application"
								},
								entity: JSON.stringify(ob)
							}).then(function(data, err) {
								console.log('subscribed to' + topicName)
								console.log(data);
								console.log(err);
								callback(data)
							});
						}
					}else{
						var ob = {
							"channels" :{"__op":"AddUnique","objects":channels},
							"deviceToken" : deviceToken,
							"deviceType": deviceType
						}
						rest({
							method:"PUT",
							path:parseUrl+'/installations/'+installationId,
							headers:{
								"X-Parse-Application-Id":parseAppId,
								"X-Parse-REST-API-Key":parseRestApiKey,
								"Content-Type":"application"
							},
							entity: JSON.stringify(ob)
						}).then(function(data) {
							console.log(data['entity']);
							callback(data['entity'])
						});
					}


				}
			});

		}catch(e){
			console.error(e);
		}
	}

	ret.subscribeToCrewChannel = function(personId, crewId, callback) {
		try{
			installation.getInstallationsByPersonId(personId, function(data){
				for(var i = 0; i<data.length; i++){
					var installationId = data[i]['installation_id'];
					var deviceToken =data[i]['device_token'];
					var deviceType = data[i]['device_type'];

					//"deviceType": "ios",
					//	"deviceToken": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",

					var ob = {
						"channels" :{"__op":"AddUnique","objects":["ch_crew_"+crewId]},
						"deviceToken" : deviceToken,
						"deviceType": deviceType
					}
					rest({
						method:"PUT",
						path:parseUrl+'/installations/'+installationId,
						headers:{
							"X-Parse-Application-Id":parseAppId,
							"X-Parse-REST-API-Key":parseRestApiKey,
							"Content-Type":"application"
						},
						entity: JSON.stringify(ob)
					}).then(function(data) {
						console.log(data['entity']);
						callback(data['entity'])
					});
				}
			});

		}catch(e){
			console.error(e);
		}
	}

	ret.pushNewPlaceNotification = function(message, placeId, pichangaId, callback){
		console.log('ret.pushCrewNotification', arguments);
		try{
			// push notifications

			var topicName = 'place_'+placeId
			var url = "https://fcm.googleapis.com/fcm/send"


			var pushBody = {
				notification : {
					title: "PichangaMaker",
					body:message
				},
				data: {alert: message,
					pichanga_id: pichangaId
				},
				to : "/topics/"+topicName
			}
			console.log("FCM push to topic for Place ",topicName)

			rest({
				method:"POST",
				path:url,
				headers:{
					'Authorization': 'key='+FCMApiKey,
					"Content-Type": "application/json"
				},
				entity: JSON.stringify(pushBody)
			}).then(function(data) {
				console.log(data)
				console.log('FCM pushed to '+topicName, data);
				callback(data);
			});

		}catch (e){
			console.log(e);
		}
	}

	ret.pushNewPichangaNotification = function(message, crewIds, pichangaId, callback){
		console.log('ret.pushCrewNotification', arguments);
		try{
			// push notifications

			for(var i = 0 ; i<crewIds.length; i++){
				var topicName = 'ch_crew_'+crewIds[i]
				var url = "https://fcm.googleapis.com/fcm/send"


				var pushBody = {
					notification : {
						title: "PichangaMaker",
						body:message
					},
					data: {alert: message,
						pichanga_id: pichangaId
					},
					to : "/topics/"+topicName
				}
				console.log("FCM push to topic",topicName)

				rest({
					method:"POST",
					path:url,
					headers:{
						'Authorization': 'key='+FCMApiKey,
						"Content-Type": "application/json"
					},
					entity: JSON.stringify(pushBody)
				}).then(function(data) {
					console.log(data)
					console.log('FCM pushed to '+topicName, data);
					callback(data);
				});
			}

			var channels = [];
			for(var i = 0 ; i<crewIds.length; i++){
				channels.push('ch_crew_'+crewIds[i])
			}

			var pushBody = {
				channels:channels,
				data: {alert: message,
					pichanga_id: pichangaId
				}
			}
			console.log("pushBody",pushBody)

			rest({
				method:"POST",
				path:parseUrl+'/push',
				headers:{
					"X-Parse-Application-Id": parseAppId,
					"X-Parse-REST-API-Key": parseRestApiKey,
					"Content-Type": "application"
				},
				entity: JSON.stringify(pushBody)
			}).then(function(data) {
				response = data['entity']
				console.log('ret.pushCrewNotification', response);
				callback(response);
			});
		}catch (e){
			console.log(e);
		}
	}

	ret.sendChannelNotification = function(personId, userName, message, pichangaId, callback){
		try{
			// push notifications
			var topicName = "ch_pi_"+pichangaId
			var pushBody = {
				channels:[],
				data: {alert: name+" : "+message,
					pichanga_id: pichangaId,
					person_id: personId
				}
			}

			console.log("pushBody",pushBody)


			rest({
				method: 'POST',
				path: 'https://fcm.googleapis.com/fcm/send',
				headers: {
					'Content-Type' :' application/json',
					'Authorization': 'key='+FCMApiKey
				},
				body: JSON.stringify({
					notification:pushBody,
					to : '/topics/'+topicName
				})
			}, function(error, response, body) {
				if (error) { console.error(error); }
				else if (response.statusCode >= 400) {
					console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage);
				}
				else {
					callback(response);
				}
			});


			//rest({
			//	method:"POST",
			//	path:parseUrl+'/push',
			//	headers:{
			//		"X-Parse-Application-Id": parseAppId,
			//		"X-Parse-REST-API-Key": parseRestApiKey,
			//		"Content-Type": "application"
			//	},
			//	entity: JSON.stringify(pushBody)
			//}).then(function(data) {
			//	response = data['entity']
            //
			//	console.log(response)
			//	callback(response);
			//	// console.log('response: ', response);
			//	// res.send(response);
			//});
		}catch (e){
			console.log(e);
		}
	}

	ret.sendChannelNotificationOnNewJoinedUser = function(message, pichangaId, callback){
		try{
			// push notifications
			var pushBody = {
				channels:["ch_pi_"+pichangaId],
				data: {alert: message,
					pichanga_id: pichangaId,
					pichanga:{
						type:"pichanga",
						pichanga_id: pichangaId,
					}
				}
			}
			console.log("pushBody",pushBody)

			rest({
				method:"POST",
				path:parseUrl+'/push',
				headers:{
					"X-Parse-Application-Id": parseAppId,
					"X-Parse-REST-API-Key": parseRestApiKey,
					"Content-Type": "application"
				},
				entity: JSON.stringify(pushBody)
			}).then(function(data) {
				response = data['entity']

				console.log(response)
				callback(response);
				// console.log('response: ', response);
				// res.send(response);
			});
		}catch (e){
			console.log(e);
		}
	}

	ret.subscribeToPichangaChannel = function(personId, pichangaId, callback) {
		try{
			installation.getInstallationsByPersonId(personId, function(data){
				for(var i = 0; i<data.length; i++){
					var installationId = data[i]['installation_id'];
					var deviceToken =data[i]['device_token'];
					var deviceType = data[i]['device_type'];

					//"deviceType": "ios",
					//	"deviceToken": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",

					var ob = {
						"channels" :{"__op":"AddUnique","objects":["ch_pi_"+pichangaId]},
						"deviceToken" : deviceToken,
						"deviceType": deviceType
					}
					rest({
						method:"PUT",
						path:parseUrl+'/installations/'+installationId,
						headers:{
							"X-Parse-Application-Id":parseAppId,
							"X-Parse-REST-API-Key":parseRestApiKey,
							"Content-Type":"application"
						},
						entity: JSON.stringify(ob)
					}).then(function(data) {
						console.log(data['entity']);
						// response = data['entity']
						callback(data['entity'])
					});
				}
			});

		}catch(e){
			console.error(e);
		}
	}

	ret.subscribeToRegisteredPichangasChannels = function(email, installationId, callback) {
		  	try{
				users.getPichangasByAssistantEmail(email, function(pichangas){
					console.log(pichangas)
					var chnls=[];
					for(var i = 0; i < pichangas.length; i++){
						chnls.push("ch_pi_"+pichangas[i]['pichanga_id']);
					}
					console.log(chnls);
					var ob = {
						"app_pm_email":email,
						"channels":chnls
					}
					rest({
				      method:"PUT",
				      path:parseUrl+'/installations/'+installationId,
				      headers:{
				        "X-Parse-Application-Id":parseAppId,
				        "X-Parse-REST-API-Key":parseRestApiKey,
				        "Content-Type":"application"
				      },
				      entity: JSON.stringify(ob)
				    }).then(function(data) {
				    	console.log(data['entity']);
						// response = data['entity']
				    	callback(data['entity'])
				    });
				});

		  	}catch(e){
		  		console.error(e);
		  	}
  		}
  	return ret;
  };