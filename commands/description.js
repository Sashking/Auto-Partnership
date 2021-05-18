const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../models/serverData');
const prefix = require('../config.json').prefix;

module.exports = {
	name: 'description',
	aliases: ['desc'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) return;

		const description = args.join(' ');
		if (!description)
			return message.channel.send('Please provide description!');

		const bannedWords = [
			`discord.gg`,
			`.gg/`,
			`.gg /`,
			`. gg/`,
			`. gg /`,
			`discordgg`,
			`discord.gg /`,
			`discord. gg`,
			`discord .gg`,
			`discord .gg /`,
			`discord .gg/`,
			`discord . gg`,
			`discord gg`,
			`discord gg /`,
			`.com`,
			`.xyz`,
			`.ru`,
			`.net`,
			`.org`,
			`.us`,
			`.co`,
			`www.`,
			`https`,
			`http`,
		];
		try {
			if (
				bannedWords.some((word) =>
					message.content.toLowerCase().includes(word)
				)
			) {
				return message.channel.send(
					`You are not allow to use links in your description!`
				);
			}
		} catch (e) {
			console.log(e);
		}

		Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
			if (data) {
				data.Description = description;
				data.save();
			} else {
				data = new Schema({
					Guild: message.guild.id,
					Channel: '',
					Description: description,
					Color: '',
					BumpCooldownEndsAt: Date.now(),
					Invite: '',
				});
				data.save();
			}
		});

		message.channel.send(
			new MessageEmbed()
				.setDescription(
					`New description set! You can preview it using \`${prefix}preview\``
				)
				.setColor('00ffaa')
		);
	},
};
