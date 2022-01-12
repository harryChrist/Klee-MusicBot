const Command = require('../../structures/Command')
const Discord = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            description: 'Volta a reprodução.',
            default_permission:false,
        })
    }

    run = async (interaction) => {
        let queue = this.client.distube.getQueue(interaction.member.voice.channel);
        if (queue) {
            if (queue.paused) {
                this.client.distube.resume(interaction.member.voice.channel)
                interaction.reply({
                    content: `Reprodução continuada!`,
                    ephemeral: false
                });
            } else {
                interaction.reply({
                    content: `A reprodução ja está rolando!`,
                    ephemeral: true
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