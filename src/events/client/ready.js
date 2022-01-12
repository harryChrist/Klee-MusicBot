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
        //await this.client.connectToDatabase()
        //this.client.manager.init(this.client.user.id)
    }
}