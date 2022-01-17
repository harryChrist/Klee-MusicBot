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
        // Ant Bug
        if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa estar em um canal de voz para utilizar este comando!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `Você precisa estar no mesmo canal de voz que eu para utilizar este comando!`, ephemeral: true })
        
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