const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            description: 'Toca uma música.',
            default_permission:false,
            options: [
                {
                    name: 'song',
                    type: 'STRING',
                    description: 'Nome, Link, Playlist, Youtube e Spotify.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        // Ant Bug
        if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa estar em um canal de voz para utilizar este comando!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `Você precisa estar no mesmo canal de voz que eu para utilizar este comando!`, ephemeral: true })

        const music = interaction.options.getString("song")
        if (!music) return interaction.reply({
            content: "Qual música você deseja tocar?",
            ephemeral: true
        });
        this.client.distube.play(
            interaction.member.voice.channel,
            music,
            {
                textChannel: interaction.channel,
                member: interaction.member
            }
        )
        interaction.reply({
            content: `Procurando por "${music}" e adicionando a fila..`,
            ephemeral: true
        })
    }
}