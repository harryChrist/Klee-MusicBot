const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            description: 'Altera o volúme do meu Som. (Normal: 50%)',
            default_permission:false,
            options: [
                {
                    name: 'volume',
                    type: 'NUMBER',
                    description: 'Diga o volume desejado [0 a 100]%. (Normal: 50%)',
                    required: true,
                    min_value: 0,
                    max_value: 100
                }
            ]
        })
    }

    run = async (interaction) => {
        const music = interaction.options.getNumber("volume")
        if(music < 0 || music > 100) return interaction.reply({
            content: "Porfavor, diga um número de 0 a 100!",
            ephemeral: true
        });
        this.client.distube.setVolume(
            interaction.member.voice.channel, music
        )
        //console.log(interaction)
        interaction.reply({
            content: `Volume alterado para **${music}%**`,
            ephemeral: false
        })
    }
}