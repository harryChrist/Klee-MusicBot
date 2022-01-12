// Basicamente, mencionar a mensagem
// content = mensagem;
const keyDetails = {channelId:"930094748763561994", messageId:"930094984810610708"}
async function reply(guild_id, { content }) {
    const msg = await //discord.channels['@0.2.0'].messages.create
    ({
        content: ``,
        embed: {
          description: content,
          color: 0xd43790
        },
        channel_id: keyDetails.channelId,
        message_reference: {
          message_id: keyDetails.messageId
        }
    });
    await sleep(10000);
    await msg.delete();
}

// Timing to remove
async function sleep (ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

module.exports = reply;