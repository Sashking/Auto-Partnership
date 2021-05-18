const mongo = require('mongoose');

const Schema = new mongo.Schema({
	Guild: String,
	Channel: String,
	Description: String,
	Color: String,
	BumpCooldownEndsAt: Date,
	Invite: String
});

module.exports = mongo.model('serverData', Schema);
