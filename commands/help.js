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
							`
						)
			.addField('⁣', '[Invite me to your server](https://discord.com/api/oauth2/authorize?client_id=843206273154940958&permissions=8&scope=bot) `|` Contact <@512670031247573005> for further help')
            .setColor('ffaa00')
		message.channel.send(embed)
		},
};
