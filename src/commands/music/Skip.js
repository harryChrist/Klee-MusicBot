const Command = require('../../structures/Command')
const Discord = require("discord.js")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            description: 'Pula uma música.',
            default_permission:false,
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
            //embeds:[MusicEmbed],
            ephemeral: false
        })
    }
}