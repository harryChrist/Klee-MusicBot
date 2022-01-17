const Command = require('../../structures/Command')
const Discord = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'filter',
            description: 'Filtros ou Modificações ao som que será ou está tocando.',
            options: [
                {
                    name: 'set',
                    type: 'STRING',
                    description: 'Desative e Ative reusando a mesma opção ou dando clear!',
                    choices: [
                        { name: "clear", value: "clear" },
                        { name: "cursed", value: "cursed" },
                        { name: "double", value: "double" },
                        { name: "nightcore", value: "nightcore" },
                        { name: "reverse", value: "reverse" },
                        { name: "karaoke", value: "karaoke" },
                        { name: "8D", value: "8D" },
                        { name: "bassboost", value: "bassboost" },
                        { name: "vaporwave", value: "vaporwave" },
                        { name: "pitch", value: "pitch" },
                        { name: "pulsator", value: "pulsator" },
                        { name: "subboost", value: "subboost" },
                        {name: "treble", value:"treble"},
                        { name: "flanger", value: "flanger" },
                        { name: "gate", value: "gate" },
                        { name: "haas", value: "haas" },
                        {name: "mcompand", value:"mcompand"},
                        {name:"estranhamenteconfortavel", value:"myown_purebass"},
                        {name:"crystalizer", value:"crystalizer"},
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

        const args = interaction.options.getString("set")
        let queue = this.client.distube.getQueue(interaction.member.voice.channel);
        if (args == "clear") {
            let quantidade = queue.filters.length;
            for (var i = 0; i < quantidade; i++) {
                this.client.distube.setFilter(interaction.member.voice.channel, queue.filters[0])
                console.log(i)
            }
            interaction.reply({
                content: `Limpando filtros..`,
                ephemeral: false
            })
            return;
        }
        this.client.distube.setFilter(interaction.member.voice.channel, args)
        interaction.reply({
            content: `Filtro **${args}** adicionado.\nFiltros Ativos: [${queue.filters}]`,
            ephemeral: false
        })

        /*mode === 0 ? 1 : (mode === 2 ? 0 : 2)
        let queue = th  is.client.distube.getQueue(interaction.member.voice.channel);
        let mode = queue.repeatMode*/
    }
}