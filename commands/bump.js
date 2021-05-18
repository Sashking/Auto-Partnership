const { Client, Message, MessageEmbed } = require('discord.js');
const { addMinutes, isPast, differenceInMinutes } = require('date-fns');
const Schema = require('../models/serverData');
const prefix = require('../config.json').prefix;
const bannedGuilds = require('../bannedGuilds.json').bannedGuilds;

module.exports = {
	name: 'bump',
	aliases: [],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (message.author.bot) return;
		if (bannedGuilds.includes(message.guild.id))
			return message.channel.send(
				`You have been banned! If you have any questions or want to submit a ban appeal - contact me at <@512670031247573005>.`
			);

		message.channel
			.createInvite({ maxAge: 0, maxUses: 0 })
			.then((invite) => {
				let inviteLink = 'https://discord.gg/' + invite.code;
				const members = client.guilds.cache.get(
					message.guild.id
				).memberCount;

				Schema.findOne(
					{ Guild: message.guild.id },
					async (err, data) => {
						if (data) {
							data.Invite = inviteLink;
							data.save()

							if (!isPast(data.BumpCooldownEndsAt))
								return message.channel.send(
									`You are on cooldown! Try again in **${Math.abs(
										differenceInMinutes(
											Date.now(),
											data.BumpCooldownEndsAt
										)
									)}** minutes!`
								);
							else {
								data.BumpCooldownEndsAt = addMinutes(
									Date.now(),
									20
								);
								data.save();
							}

							if (!data.Channel)
								return message.channel.send(
									`You need to configure your embed and assign a partnerships-channel first! *(TIP: Use \`${prefix}help\` for list of commands)*`
								);

							const description = data.Description;
							const color = data.Color;
							Schema.find({}, async (err, data) => {
								data.map(({ Channel }) => {
									if (Channel === message.channel.id) {
										return message.channel.send(
											'Server bumped! Sending your embed to all partner servers...'
										);
									}
									if (!Channel) {
										return;
									}

									client.channels.cache.get(Channel).send(
										new MessageEmbed()
											.setTitle(message.guild.name)
											.setThumbnail(
												message.guild.iconURL({
													dynamic: true,
												})
											)

											.setDescription(description)
											.setColor(color)

											.addField(
												'\\🔗 | Link to the server',
												`[Enter](${inviteLink})`
											)
											.addFields(
												{
													name: '👑 | Owner',
													value: message.guild.owner
														.user.tag,
													inline: true,
												},
												{
													name: '👥 | Members',
													value: members,
													inline: true,
												}
											)
											.setFooter(
												'ID: ' + message.guild.id
											)
									);
								});
							});
						} else {
							return message.channel.send(
								`You need to configure your embed and assign a partnerships-channel first! *(TIP: Use \`${prefix}help\` for list of commands)*`
							);
						}
					}
				);
			});
	},
};
