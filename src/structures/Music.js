const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify")
const Discord = require("discord.js");

const https = require('https-proxy-agent');
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);

// Queue status template
const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

const thecookie = "GPS=1; YSC=U_dTxFrqlhI; VISITOR_INFO1_LIVE=Do8GW60Qmzs; PREF=tz=America.Sao_Paulo&f6=40000000; SID=GAiPOZl0WGagekRuAxEwmnhlRr01bOP6Qak_Gr9b2ZnaJtoT0tUja3hUEBZcVhduLpZ0yw.; __Secure-1PSID=GAiPOZl0WGagekRuAxEwmnhlRr01bOP6Qak_Gr9b2ZnaJtoTAax8iWLFgNB_OESVI4OriQ.; __Secure-3PSID=GAiPOZl0WGagekRuAxEwmnhlRr01bOP6Qak_Gr9b2ZnaJtoT3hEYJq1VO2dNEc8_dESBJQ.; HSID=A4taMcSSQHxQ5_5-O; SSID=AHIBx7qRVRJyJZlfx; APISID=nMvsBYX6hkICTo0A/AnU5Im8om7bjNmS5l; SAPISID=C8FjLubmq2nfrh54/Ak8m1tmmObkExncDq; __Secure-1PAPISID=C8FjLubmq2n…bkExncDq; LOGIN_INFO=AFmmF2swRQIhAPG7l_N23-tR9pgguh_WCh_OJ5TaMD4HGi-v8ZKHE3zRAiAsEXZthKT8KEgDi5HK3jWqTJ50b8jReNNmrE5MEv_L_w:QUQ3MjNmeUdfX1B5SkVtOFVVMnBYMGxwRGRlSERFNWVheGl3RHdodGZiMFg0aHpHVDM0UGk1Tk5MVUdfRmcyb1pDZkVYS1h1WTB6eUpwekFPbHR1bTJCejBIVldVRHkzVFR3WVFGRkRwcUtZMHEwMktSTzdMRGlwWjFDQTc0SklxVjMzMXR3NnNfVU1tamxhbmhudzVjOXEtcExXSTlkX3lB; SIDCC=AJi4QfGbcQz_Pz0yyUB5prAyo_8sdQ8dNjXFil4beq6D3WG-27flWeI5JCIldsgXrA7d0x6J; __Secure-3PSIDCC=AJi4QfHyShV_6IrOhjqtas5CEvH-7JUnujkSJN8j8SVFUHcMPx52DoXuj_nZis17-Hw3ynBb"

module.exports = (client) => {
    return distube = new DisTube(client, {
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality: "highestaudio",
            format: "audioonly",
            liveBuffer: 6000,
            dlChunkSize: 1024 * 1024 * 64,
            filter: "audioonly",
            requestOptions: {
              //agent,
               cookie: thecookie,
            },
          },
        searchSongs: 0,
        emptyCooldown: 120,
        leaveOnEmpty: true,
        leaveOnFinish: false,
        leaveOnStop: false,
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