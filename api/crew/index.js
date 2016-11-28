'use strict';

var express = require('express');
var controller = require('./crew.controller');
var userAuth = require('../middleware/userAuth');

var router = express.Router();

router.get('/', userAuth.userAuthentication, controller.index);
//router.get('/:id', controller.show);
//router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;