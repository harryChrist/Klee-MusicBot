const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            description: 'Altera o volúme do meu Som. (Normal: 50%)',
            options: [
                {
                    name: 'volume',
                    type: 'NUMBER',
                    description: 'Diga o volume desejado [0 a 100]%. (Normal: 50%)',
                    required: true
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