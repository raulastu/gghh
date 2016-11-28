'use strict';

var path = require('path');

module.exports = function(app) {
    console.log("routes exports")

    // CORS config
    /*app.all('/*', function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     //res.header("Content-Type", "application/json");
     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
     next();
     });*/

    // Insert routes below
    //app.use('/api/tests', require('./api/test'));
    //app.use('/api/healthcheck', require('./api/healthcheck'));
    //app.use('/api/clients', require('./api/client'));
    //app.use('/api/sockets', require('./api/socket'));
    //app.use('/api/portals', require('./api/portal'));
    //app.use('/api/history', require('./api/history'));
    app.use('/crews', require('./api/crew'));
    //app.use('/api/users', require('./api/user'));
    //app.use('/api/port', require('./api/port'));

};