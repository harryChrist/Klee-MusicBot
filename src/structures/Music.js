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
const thecookie = "VISITOR_INFO1_LIVE=0GE1ZTt3S80; PREF=tz=America.Sao_Paulo&f6=40000000; GPS=1; YSC=yFZadZKO_H0; CONSISTENCY=AGDxDeMK-PVHXAAdY7Kpf4Stz6c89s9SyhBejSFZKIpFhTb-tXKqGHvIOIsMs5nG5QDNSXXxS6CHuQV4o6frOUIwM5hRTHFLnmxOx41A2dF5WovMNxvqqznFKzwx_P5IIvEZe2hGNgRwNP1D-EcCDA; SID=Jghl1yr2kCUbhcpeeFg0saApGRT-uPv7dBkt5zq1KMJcbpGPlNeW27qlr-32eXX9KuTlWg.; __Secure-1PSID=Jghl1yr2kCUbhcpeeFg0saApGRT-uPv7dBkt5zq1KMJcbpGPN2n9ZvarSthkLTalqcRI_w.; __Secure-3PSID=Jghl1yr2kCUbhcpeeFg0saApGRT-uPv7dBkt5zq1KMJcbpGPfXOvA1eGOG7qf8sCzctVtw.; …J2kXFX; LOGIN_INFO=AFmmF2swRAIgJrnhzYtfmzBpKKXi87EmQpNM7KRk3L9ZNto-LGALT4kCIFL9wo1-vWqyrW_tYHBAITyfWtqsxjInfRre8oAx0yok:QUQ3MjNmemxiSTYxdU04WTJLYVRsTUFYd0JTdm9EdzE0cFl4TTZTU2V6dWNCVXlhWTA2Q20tS3NKc1BRVVp5RnFDX2hKaVNCc0xLX3FBSFdWSkRHSjFMWF9GZVFieXJfbF9TSThVQm44ZFRXcllDTzZnS3B2X2pwNjFuMHNzejUtbFN4UGlqR3VVYnNmNzQ3bEJYaVBidUZZbmRpWlpaLUxR; SIDCC=AJi4QfHWqPkrFE6CpIzffghfjOkoDMmIVYTHjXWYUuZ1epnYSoaa9Yc2nhPMmBPFxTuT8lvbhg; __Secure-3PSIDCC=AJi4QfFGwSEji4GqzA2bSX2fy_8y9FIstaWccowcZU5aWHt7MdN5vL5NJ8jVNA0tmAexBxljcQ"

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
                .setFooter({text: `Pedido por: ${song.user.username}#${song.user.discriminator}`, iconURL: song.user.displayAvatarURL()})
                .addField('Duração', song.formattedDuration, true)
                .addField('Views', formatter.format(song.views), true)
                .addField('Likes', formatter.format(song.likes), true)
            queue.textChannel.send({ content: `${song.user}, ${"``"}${song.name}${"``"} foi adicionado na posição **${queue.songs.length}**.`//, embeds:[MusicEmbed]
        });
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
            channel.send(`:x:  | An error encountered: ${e.toString().slice(0, 1974)}`)
            console.error(e)
        })
}