const Command = require('../../structures/Command')
const Discord = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'autoplay',
            description: 'Ativa reprodução automática, para caso a sua lista acabe as músicas.',
            default_permission:false
        })
    }

    run = async (interaction) => {
        // Ant Bug
        if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa estar em um canal de voz para utilizar este comando!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `Você precisa estar no mesmo canal de voz que eu para utilizar este comando!`, ephemeral: true })
        
        let queue = this.client.distube.getQueue(interaction.member.voice.channel);
        if(queue) {
            let status = queue.autoplay
            if(queue.autoplay) {
                queue.autoplay = false
            } else {
                queue.autoplay = true
            }
            interaction.reply({
                content: `Autoplay foi ${status ? 'desligado' : 'ligado'}!`,
                ephemeral: false
            })
        } else if (!queue) {
            return interaction.reply({
                content: `Não tem nada tocando no momento!`,
                ephemeral: true
            });
        }
    }
}