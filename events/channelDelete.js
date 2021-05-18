const client = require('../index')
const Schema = require('../models/serverData')

client.on('channelDelete', async (channel) => {
    Schema.findOne({ Channel: channel.id }, async (err, data) => {
        if (data) {
            data.Channel = ''
            data.save()
        }
    })
})