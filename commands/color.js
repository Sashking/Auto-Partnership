const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../models/serverData');
const prefix = require('../config.json').prefix;

module.exports = {
	name: 'color',
	aliases: [],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) return;

		const color = args[0];
		if (!color || !isHex(color) || args[0].length != 6)
			return message.channel.send('Please provide a valid color!');

		Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
			if (data) {
				data.Color = color;
				data.save();
			} else {
				data = new Schema({
					Guild: message.guild.id,
					Channel: '',
					Description: '',
					Color: color,
					BumpCooldownEndsAt: Date.now(),
					Invite: '',
				});
				data.save();
			}
		});

		message.channel.send(
			new MessageEmbed()
				.setDescription(
					`New color set! You can preview it using \`${prefix}preview\``
				)
				.setColor('00ffaa')
		);
	},
};

function isHex(h) {
	var a = parseInt(h, 16);
	return a.toString(16) === h;
}
