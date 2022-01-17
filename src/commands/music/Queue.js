const Command = require('../../structures/Command');
const Discord = require("discord.js");

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            description: 'Lista de reprodução!.',
            default_permission:false,
        })
    }

    run = async (interaction) => {
        // Ant Bug
        if (!interaction.member.voice.channel) return interaction.reply({ content: `Você precisa estar em um canal de voz para utilizar este comando!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `Você precisa estar no mesmo canal de voz que eu para utilizar este comando!`, ephemeral: true })
        
        let queue = this.client.distube.getQueue(interaction.member.voice.channel);
        let song = queue.songs[0] // The next song
        if(!queue) return;
        if(!song) return interaction.reply({
            content:"o Bot não está em reprodução no momento!",
            ephemeral: true
        });
        let MusicEmbed = new Discord.MessageEmbed()
            .setTitle(song.name)
            .setURL(song.url)
            .setThumbnail(song.thumbnail)
            .setAuthor({name: song.uploader.name, url:song.uploader.url})
            .addField('Duração', song.formattedDuration, true)
            .addField('Pedido por', song.user.username, true);
        interaction.reply({
            content: `** Queue List(${ queue.songs.length - 1 }):**\n` + (queue.songs.length - 16 < 0 ? "" : `and ** ${ queue.songs.length - 16 } ** more..\n`) + queue.songs.map((song, id) => `${ id }.${ song.name } - \`${song.formattedDuration}\``).slice(1, 16).reverse().join("\n"),
            embeds: [MusicEmbed],
            ephemeral: true
        })
    }
}