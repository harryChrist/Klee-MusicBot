const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            description: 'Para todas as reproduções.',
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
        
        this.client.distube.stop(
            interaction.member.voice.channel,
        )
        interaction.reply({
            content: "Todas as músicas foram removidas..",
            ephemeral: false
        })
    }
}