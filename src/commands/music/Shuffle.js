const Command = require('../../structures/Command')
const Discord = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'shuffle',
            description: 'Embaralha as músicas.',
            default_permission:false,
        })
    }

    run = async (interaction) => {
        this.client.distube.shuffle(interaction.member.voice.channel);
        interaction.reply({
            content: `A lista de reprodução foi embaralhada!`,
            ephemeral: false
        })
    }
}