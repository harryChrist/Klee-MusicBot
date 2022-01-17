const Command = require('../../structures/Command')
const Discord = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            description: 'Deixa a música ou a playlist em looping.',
            options: [
                {
                    name: 'set',
                    type: 'INTEGER',
                    description: 'Desativado, Music, Queue',
                    choices: [
                        {
                            name:"off",
                            value:0
                        },
                        {
                            name:"music",
                            value:1
                        },
                        {
                            name:"playlist",
                            value:2
                        },
                    ],
                    required: true,
                }
            ]
            
        })
    }

    run = async (interaction) => {
        // Ant Bug
        if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa estar em um canal de voz para utilizar este comando!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `Você precisa estar no mesmo canal de voz que eu para utilizar este comando!`, ephemeral: true })
        
        const args = interaction.options.getInteger("set")
        this.client.distube.setRepeatMode(interaction.member.voice.channel, args)
        interaction.reply({
            content: `Modo de looping setado para: **${args === 0 ? "Off" : (args === 2 ? "All Queue" : "This Song")}**`,
            ephemeral: false
        })

        /*mode === 0 ? 1 : (mode === 2 ? 0 : 2)
        let queue = this.client.distube.getQueue(interaction.member.voice.channel);
        let mode = queue.repeatMode*/
    }
}