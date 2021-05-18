const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../models/serverData')

module.exports = {
    name: 'partner-channel',
    aliases: ['pc', 'channel'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return

        const channel = message.mentions.channels.first() || message.channel
        if (message.guild.channels.cache.get(channel.id).type === 'voice') return message.channel.send('Please choose a valid text channel!')

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (data) {
                data.Channel = channel.id
                data.save()
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id,
                    Description: '',
                    Color: '',
                    BumpCooldownEndsAt: Date.now(),
					Invite: '',
                }).save()
            }

            message.channel.send( 
                new MessageEmbed()
                  .setDescription(`${channel} has been set as partnerships channel.`)
                  .setColor('00ffaa')
            )
        })
    }
}