const Command = require('../../structures/Command')
const Discord = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            description: 'Pula uma música.',
        })
    }

    run = async (interaction) => {
        let queue = this.client.distube.getQueue(interaction.member.voice.channel);
        if (!queue.autoplay && queue.songs.length <= 1) return interaction.reply({
            content: "Não posso pular, se essa é a ultima música..",
            ephemeral: true
        });
        this.client.distube.skip(
            interaction.member.voice.channel,
        )
        if(queue.autoplay) return interaction.reply({
            content: "Pulando..",
            ephemeral: false
        });
        let song = queue.songs[1] // The next song
        let MusicEmbed = new Discord.MessageEmbed()
            .setTitle(song.name)
            .setURL(song.url)
            .setThumbnail(song.thumbnail)
            .setAuthor({name: song.uploader.name, url:song.uploader.url})
            .addField('Duração', song.formattedDuration, true)
            .addField('Pedido por', song.user.username, true);
        interaction.reply({
            content: "Pulando..",
            embeds:[MusicEmbed],
            ephemeral: false
        })
    }
}