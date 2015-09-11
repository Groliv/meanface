var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	    	console.log("=================11=======================");

	require('../app/models/user.server.model');
	require('../app/models/publication.server.model');

	return db;
};