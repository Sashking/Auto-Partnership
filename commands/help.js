const { MessageEmbed } = require("discord.js");
const prefix = require("../config.json").prefix;

module.exports = {
		name: "help",
		aliases : ['h'],
		/**
		 * @param {Client} client
		 * @param {Message} message
		 * @param {String[]} args
		*/
		run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setTitle('Commands')
            .setDescription(
							`
								**\`${prefix}bump\`** - sends your server's embed to all partnered servers
								**\`${prefix}preview\`** - preview your server's embed
								**\`${prefix}description\`** - change you server's description on embed
								**\`${prefix}color\`** - change color of your embed
								**\`${prefix}partner-channel\`** - set channel for other partners
								**\`${prefix}help\`** - list of all commands
								**\`${prefix}ping\`** - current ping of bot

								*Contact <@512670031247573005> to report any server*
							`
						)
            .setColor('ffaa00')
		message.channel.send(embed)
		},
};
