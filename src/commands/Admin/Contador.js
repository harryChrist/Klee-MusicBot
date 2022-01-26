const { MessageActionRow, MessageButton } = require('discord.js')
const Command = require('../../structures/Command')

const actionRow = new MessageActionRow()
    .addComponents(
        [
            new MessageButton()
                .setStyle('DANGER')
                .setLabel('-1')
                .setCustomId('REMOVER'),
            new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('+1')
                .setCustomId('ADICIONAR'),
            new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('ZERAR')
                .setCustomId('ZERAR'),
            new MessageButton()
                .setStyle('SECONDARY')
                .setLabel('FINALIZAR')
                .setCustomId('FINALIZAR')
        ]
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'contador',
            description: 'Inicia um contador no canal',
            options: [
                {
                    name: 'set',
                    type: 'NUMBER',
                    description: 'Quanto tempo irá rolar? (até 200m)',
                    required: true,
                    min_value: 1,
                    max_value: 200
                }
            ]
        })
    }

    run = async (interaction) => {
        const time = interaction.options.getNumber("set") * 60 * 1000;
        let contagem = 0; let countDownDate = new Date().getTime() + time;
        function conta() {
            //let b = (tempo - a) / 1000;
            //console.log(b)

            var now = new Date().getTime();
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return hours + "h "
                + minutes + "m " + seconds + "s ";; // Segundos;
        }

        const reply = await interaction.reply({
            content: `Tempo: \`${conta()}\`\nContagem: \`${contagem}\``,
            components: [actionRow],
            fetchReply: true
        })

        const filter = (b) => b.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, time: time })

        collector.on('collect', (i) => {
            switch (i.customId) {
                case 'REMOVER':
                    contagem--
                    break;
                case 'ADICIONAR':
                    contagem++
                    break;
                case 'ZERAR':
                    contagem = 0
                    break;
            }

            i.update({
                content: `Tempo: \`${conta()}\`\nContagem: \`${contagem}\``
            })
        })
        collector.on('end', (collected, reason) => {
            if (reason === 'time') interaction.editReply({
                content: `Contagem finalizada em: \`${contagem}\``,
                components: []
            })
        })
    }
}