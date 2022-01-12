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
        const music = interaction.options.getString("song")
        if (!music) return interaction.reply({
            content: "Qual música você deseja tocar?",
            ephemeral: true
        });
        this.client.distube.playVoiceChannel(
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