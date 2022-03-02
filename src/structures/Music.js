const { DisTube } = require("distube");
const Discord = require("discord.js");

// Ignora
const https = require('https-proxy-agent');
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);

// Queue status template
const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// Cookie
const thecookie = "GPS=1; YSC=U_dTxFrqlhI; VISITOR_INFO1_LIVE=Do8GW60Qmzs; PREF=tz=America.Sao_Paulo&f6=40000000; SID=GAiPOZl0WGagekRuAxEwmnhlRr01bOP6Qak_Gr9b2ZnaJtoT0tUja3hUEBZcVhduLpZ0yw.; __Secure-1PSID=GAiPOZl0WGagekRuAxEwmnhlRr01bOP6Qak_Gr9b2ZnaJtoTAax8iWLFgNB_OESVI4OriQ.; __Secure-3PSID=GAiPOZl0WGagekRuAxEwmnhlRr01bOP6Qak_Gr9b2ZnaJtoT3hEYJq1VO2dNEc8_dESBJQ.; HSID=A4taMcSSQHxQ5_5-O; SSID=AHIBx7qRVRJyJZlfx; APISID=nMvsBYX6hkICTo0A/AnU5Im8om7bjNmS5l; SAPISID=C8FjLubmq2nfrh54/Ak8m1tmmObkExncDq; __Secure-1PAPISID=C8FjLubmq2n…bkExncDq; LOGIN_INFO=AFmmF2swRQIhAPG7l_N23-tR9pgguh_WCh_OJ5TaMD4HGi-v8ZKHE3zRAiAsEXZthKT8KEgDi5HK3jWqTJ50b8jReNNmrE5MEv_L_w:QUQ3MjNmeUdfX1B5SkVtOFVVMnBYMGxwRGRlSERFNWVheGl3RHdodGZiMFg0aHpHVDM0UGk1Tk5MVUdfRmcyb1pDZkVYS1h1WTB6eUpwekFPbHR1bTJCejBIVldVRHkzVFR3WVFGRkRwcUtZMHEwMktSTzdMRGlwWjFDQTc0SklxVjMzMXR3NnNfVU1tamxhbmhudzVjOXEtcExXSTlkX3lB; SIDCC=AJi4QfGbcQz_Pz0yyUB5prAyo_8sdQ8dNjXFil4beq6D3WG-27flWeI5JCIldsgXrA7d0x6J; __Secure-3PSIDCC=AJi4QfHyShV_6IrOhjqtas5CEvH-7JUnujkSJN8j8SVFUHcMPx52DoXuj_nZis17-Hw3ynBb"

// Plugins Players
const { SpotifyPlugin } = require("@distube/spotify")
const { YtDlpPlugin } = require("@distube/yt-dlp")

// Format Number
let formatter = Intl.NumberFormat('br', { notation: 'compact' });

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
        youtubeDL: false,
        updateYouTubeDL:false,
        searchSongs: 0,
        emptyCooldown: 30,
        leaveOnEmpty: true,
        leaveOnFinish: false,
        leaveOnStop: false,
        customFilters: {
            "double": "aecho=0.8:0.88:60:0.4",
            "fullaudio": "bass=g=7,dynaudnorm=f=200,apulsator=hz=0.08",
            "cursed": "vibrato=f=6.5,tremolo,aresample=48000,asetrate=48000*1.25",
            "pitch": "asetrate=48000*1.25,aresample=48000,atempo=0.7",
            "8D": "apulsator=hz=0.08",
            "pulsator": "apulsator=hz=1",
            "subboost": "asubboost",
            "treble": "treble=g=5",
            "flanger": "flanger",
            "gate": "agate",
            "haas": "haas",
            "crystalizer": "crystalizer=i=4",
            "mcompand": "mcompand",
            "speed_15": "atempo=1.5",
            "speed_2": "atempo=2.0",
            "myown_purebass": "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
        },
        plugins: [new SpotifyPlugin(), new YtDlpPlugin()]
    })
        .on("playSong", (queue, song) => {
            let guild = queue.clientMember.guild
            let msg = `'${guild.name}'(${guild.id}) == \`${song.name}\` : \`${song.formattedDuration}\``
            if (song.playlist) msg = `${msg} Playlist: \`${song.playlist.name}\``
            console.log(msg)
            let MusicEmbed = new Discord.MessageEmbed()
                .setTitle(song.name)
                .setURL(song.url)
                .setThumbnail(song.thumbnail)
                .setAuthor({ name: song.uploader.name, url: song.uploader.url })
                .setFooter({text: `Pedido por: ${song.user.username}#${song.user.discriminator}`, iconURL: song.user.displayAvatarURL()})
                .addField('Duração', song.formattedDuration, true)
                .addField('Views', formatter.format(song.views), true)
                .addField('Likes', formatter.format(song.likes), true)
                queue.textChannel.send({embeds: [MusicEmbed] });
        })
        .on("addSong", (queue, song) => {
            let MusicEmbed = new Discord.MessageEmbed()
                .setTitle(song.name)
                .setURL(song.url)
                .setThumbnail(song.thumbnail)
                .setAuthor({ name: song.uploader.name, url: song.uploader.url })
                .addField('Duração', song.formattedDuration, true)
                .addField('Views', formatter.format(song.views), true)
                .addField('Pedido por', song.user.username, true);
            queue.textChannel.send({ content: `${song.user}, ${"``"}${song.name}${"``"} foi adicionado na posição **${queue.songs.length}**.`});
        })
        .on("addList", (queue, playlist) => {
            let MusicEmbed = new Discord.MessageEmbed()
                .setTitle(playlist.name)
                .setURL(playlist.url)
                .setThumbnail(playlist.thumbnail)
                .setDescription(`Pedido por: ${playlist.user}\nFonte: ${playlist.source}`)
            queue.textChannel.send({ content: `Playlist adicionada a fila:`, embeds: [MusicEmbed] });
        })
        .on("error", (channel, e) => {
            //channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
            console.error(e)
        })
}