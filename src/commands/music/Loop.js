const Command = require('../../structures/Command')
const Discord = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            description: 'Deixa a música ou a playlist em looping.',
            default_permission:false,
            options: [
                {
                    name: 'option',
                    type: 'NUMBER',
                    description: '0:Desativado, 1:Music, 2:Queue',
                    required: true,
                    min_value: 0,
                    max_value: 2
                }
            ]
            
        })
    }

    run = async (interaction) => {
        // Ant Bug
        if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa estar em um canal de voz para utilizar este comando!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `Você precisa estar no mesmo canal de voz que eu para utilizar este comando!`, ephemeral: true })
        
        const args = interaction.options.getNumber("option")
        this.client.distube.setRepeatMode(interaction.member.voice.channel, args)
        interaction.reply({
            content: `Modo de looping setado para: ${args === 0 ? "Off" : (args === 2 ? "All Queue" : "This Song")}`,
            ephemeral: false
        })
        console.log(args)

        /*mode === 0 ? 1 : (mode === 2 ? 0 : 2)
        let queue = this.client.distube.getQueue(interaction.member.voice.channel);
        let mode = queue.repeatMode*/
    }
}