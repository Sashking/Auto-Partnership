const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../models/serverData')

module.exports = {
    name: 'preview',
    aliases: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let inviteLink = ''
        message.channel.createInvite({ maxAge: 0, maxUses: 0 })
            .then(invite => { 
                inviteLink = 'https://discord.gg/' + invite.code
                const members = client.guilds.cache.get(message.guild.id).memberCount

                Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                    const embed = new MessageEmbed()
                        .setTitle(message.guild.name)
                        .setThumbnail(message.guild.iconURL({ dynamic : true }))
                        .addField( '\\🔗 | Link to the server', `[Enter](${inviteLink})` )
                        .addFields(
                            { name: '👑 | Owner', value: message.guild.owner.user.tag, inline: true },
                            { name: '👥 | Members', value: members, inline: true }
                        )
                        .setFooter('ID: ' + message.guild.id)

                    if (data) {
                            embed.setDescription(data.Description)
                            embed.setColor(data.Color)
                    } else {
                        data = new Schema({
                            Guild: message.guild.id,
                            Channel: '',
                            Description: '',
                            Color: '',
                            BumpCooldownEndsAt: Date.now(),
                            Invite: inviteLink,
                        })
                        data.save()
                    }

                    message.channel.send(embed)
                })
        })
    }
}