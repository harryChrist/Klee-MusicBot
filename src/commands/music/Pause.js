const Command = require('../../structures/Command')
const Discord = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            description: 'Pausa a reprodução.',
            default_permission:false
        })
    }

    run = async (interaction) => {
        let queue = this.client.distube.getQueue(interaction.member.voice.channel);
        if (queue) {
            if (queue.paused) {
                interaction.reply({
                    content: `A reprodução ja está pausada!`,
                    ephemeral: true
                });
            } else {
                this.client.distube.pause(interaction.member.voice.channel)
                interaction.reply({
                    content: `Reprodução pausada!`,
                    ephemeral: false
                });
            }
        } else if (!queue) {
            return interaction.reply({
                content: `Não tem nada tocando no momento!`,
                ephemeral: true
            });;
        }
    }
}