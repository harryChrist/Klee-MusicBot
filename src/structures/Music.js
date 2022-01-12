const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify")
const Discord = require("discord.js");

// Queue status template
const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

module.exports = (client) => {
    return distube = new DisTube(client, {
        searchSongs: 0,
        searchCooldown: 30,
        leaveOnEmpty: false,
        leaveOnFinish: false,
        leaveOnStop: true,
        plugins: [new SpotifyPlugin()]
    })
        .on("playSong", (queue, song) => {
            let msg = `Playing: \`${song.name}\` - \`${song.formattedDuration}\``


            let MusicEmbed = new Discord.MessageEmbed()
            .setTitle(song.name)
            .setURL(song.url)
            .setThumbnail(song.thumbnail)
            .setAuthor({name: song.uploader.name, url:song.uploader.url})
            .addField('Duração', song.formattedDuration, true)
            .addField('Pedido por', song.user.username, true);
            if (song.playlist) msg = `Playlist: ${song.playlist.name}\n${msg}`
            //queue.textChannel.send({embeds:[MusicEmbed]})
            //console.log(queue.textChannel.guild.id)
        })
        .on("addSong", (queue, song) => {
            let MusicEmbed = new Discord.MessageEmbed()
            .setTitle(song.name)
            .setURL(song.url)
            .setThumbnail(song.thumbnail)
            .setAuthor({name: song.uploader.name, url:song.uploader.url})
            .addField('Duração', song.formattedDuration, true)
            .addField('Pedido por', song.user.username, true);
            queue.textChannel.send({content:`Adicionado a fila na posição ${queue.songs.length}:`, embeds:[MusicEmbed]});
        })
        .on("addList", (queue, playlist) => {
            let MusicEmbed = new Discord.MessageEmbed()
            .setTitle(playlist.name)
            .setURL(playlist.url)
            .setThumbnail(playlist.thumbnail)
            .setDescription(`Pedido por: ${playlist.user}`)
            .setFooter({text:`Fonte: ${playlist.source}`});
            queue.textChannel.send({content:`Playlist adicionada a fila:`, embeds:[MusicEmbed]});
        })
        .on("error", (channel, e) => {
            //channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
            console.error(e)
        })
}