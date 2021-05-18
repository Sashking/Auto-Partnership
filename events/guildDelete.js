const client = require('../index')
const Schema = require('../models/serverData')

client.on('guildDelete', async (guild) => {
    Schema.findOne({ Guild: guild.id }, async (err, data) => {
        if (data) Schema.deleteOne({ Guild: guild.id }, (err) => console.log(err))
    })
})