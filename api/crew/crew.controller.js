'use strict';

var crew = require('./crew.model.js');

//app.get('/', ,  function(req, res){
//	res.header("Content-Type", "application/json");
//
//
//
//});


exports.index = function(req, res) {

	console.log('index');

	var personId = req.session.loggedInUser.person_id;
	var query = req.query.query;

	crew.getCrewsByMember(personId, query, function(data){
		res.send({'data':data});
	})
};

//app.get('/1/crews', userAuthentication,  function(req, res){
//	res.header("Content-Type", "application/json");
//
//	var personId = req.session.loggedInUser.person_id;
//	var query = req.query.query;
//	crew.getCrewsByMember(personId, query, function(data){
//		res.send(data);
//	})
//});
//
////get crew detail and its members
//app.get('/:crew_id', userAuthentication,  function(req, res){
//	res.header("Content-Type", "application/json");
//
//	crew.getCrewById(req.params.crew_id, function(data){
//		res.send(data);
//	});
//});
