const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Limpar o chat. [0 a 100] msgs',
            options: [
                {
                    name: 'amount',
                    type: 'NUMBER',
                    description: 'Diga quantas mensagens deseja deletar! [0 a 100]',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'Você precisa de permissão para expulsar membros no servidor.', ephemeral: true })
        const amount = interaction.options.getNumber("amount")
        if(amount < 0 || amount > 100) return interaction.reply({
            content: "Só posso remover até 100 mensagens..",
            ephemeral: true
        });
        interaction.channel.bulkDelete(amount, true);
        // You need to set the filterOld parameter to true
        // to automatically filter out old messages and not throw an error.

        //console.log(interaction)
        interaction.reply({
            content: `:pig: **${amount} Mensagens foram removidas!** :broom:`,
            ephemeral: false
        })
    }
}