const Command = require('../../structures/Command')
const {inspect} = require("util");
const {MessageEmbed} = require("discord.js");

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Eval is the command for Ownerbot.',
            options: [{
                name: "code",
                description: "type a code to execute",
                type: 3,
                required: true
        }]
        })
    }

    run = async (interaction) => {
        // Only Owner
        if (!this.client.owner.includes(interaction.member.user.id)) return interaction.reply({
            content: "❌ You dont have perms to use this command.\nOnly Bot Owner's can use this command",
            ephemeral:true
        });

        // Catch the value
        let toEval = interaction.options.getString("code")
        interaction.reply({content:"Processing: ```"+toEval+"```", ephemeral: true})

        try {
            // Execute
            let evaluated = inspect(eval(toEval))

            // Embed Err
            if (evaluated.length > 1950) return interaction.channel.send({
                content: "Sorry: `Request is too long.`, but i process the command!",
            });
            // Time Executed
            let hrDiff = process.hrtime(process.hrtime());
            // Embed
            const embed = new MessageEmbed()
                .setTitle("EVAL").setColor("RANDOM")
                .setDescription(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``)
                .setThumbnail(interaction.member.user.displayAvatarURL())
                .setFooter({text:interaction.member.user.tag})
            interaction.channel.send({
                embeds:[embed],
            })
        } catch (e) { // Catch Err
            interaction.channel.send({
                content: `An error occurred : \`${e.message}\``
            });
        }
    }
}