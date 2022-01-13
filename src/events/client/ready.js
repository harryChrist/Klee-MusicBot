const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        console.log(`Bot ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores.`)
        this.client.user.setPresence(
            {
                activities: [{
                    name: 'Good Songs.',
                    type: "LISTENING"
                }], status: 'online'
            });
        this.client.registryCommands()
        //this.client.user.setUsername('Mafuyu')
        //this.client.user.setAvatar('https://cdn.discordapp.com/attachments/483399336080965652/931027659142623282/1yTX3yhf_400x400.png')
        //await this.client.connectToDatabase()
        //this.client.manager.init(this.client.user.id)
    }
}