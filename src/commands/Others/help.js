const Command = require('../../structures/Command')
const {MessageEmbed} = require("discord.js");

const ajuste = {
}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: 'Help Command.'
        })
    }

    run = (interaction) => {
        let Embed = new MessageEmbed()
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor("RANDOM")
            .setFooter({text: this.client.user.username, iconURL: this.client.user.displayAvatarURL()})
            for (let i=0; i<this.client.help.categorys.length; i++) {
                let a = this.client.help.categorys[i]
                if(a!=="Private") Embed.addField(ajuste[a] || a, this.client.help.commands.filter(b=> b.category == a).map(c => c.name).join(" | ") );
            }
        interaction.reply({
            content: `All commands using Slash. **/command [option]..**`,
            embeds: [Embed],
            ephemeral: true
        });
    }
}