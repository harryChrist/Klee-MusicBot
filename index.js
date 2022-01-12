require('dotenv').config()

const Client = require('./src/structures/Client')

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'
    ]
})

client.login("ODg0NDE0MDc4ODcxODI2NDM0.YTYIzA.Ze6Y7lZkTU90w4iezc09odHrPBo")