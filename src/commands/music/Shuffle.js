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
        // Ant Bug
        if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa estar em um canal de voz para utilizar este comando!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `Você precisa estar no mesmo canal de voz que eu para utilizar este comando!`, ephemeral: true })
        
        let queue = this.client.distube.getQueue(interaction.member.voice.channel);
        if (!queue) {
            return interaction.reply({
                content: `Não tem nada tocando no momento!`,
                ephemeral: true
            });
        }
        
        this.client.distube.shuffle(interaction.member.voice.channel);
        interaction.reply({
            content: `A lista de reprodução foi embaralhada!`,
            ephemeral: false
        })
    }
}