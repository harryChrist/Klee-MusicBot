const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            description: 'Altera o volúme do meu Som. (Normal: 50%)',
            default_permission:false,
            options: [
                {
                    name: 'set',
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
        
        const music = interaction.options.getNumber("set")
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