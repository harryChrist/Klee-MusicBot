const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            description: 'Para todas as reproduções.',
        })
    }

    run = async (interaction) => {
        this.client.distube.stop(
            interaction.member.voice.channel,
        )
        interaction.reply({
            content: "Todas as músicas foram removidas..",
            ephemeral: false
        })
    }
}