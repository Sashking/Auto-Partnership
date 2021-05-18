const { Collection, Client, Discord } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const client = new Client({
	disableEveryone: true,
});
const mongoKey = config.mongo;
const mongo = require('mongoose');
mongo
	.connect(mongoKey, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(console.log('\n\n💾  Connected to MongoDB!'));
const prefix = config.prefix;
const token = config.token;
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
['command'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

client.login(token);
