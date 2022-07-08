const { MessageEmbed } = require('discord.js');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var bendume = [
    {
        "nameduma": "https://media.discordapp.net/attachments/984111465936064522/984550866281431190/talking-ben-yes.gif",
        "nameduma1": "yes"
    },
    {
        "nameduma": "https://media.discordapp.net/attachments/984111465936064522/984550866621194331/icegif-226.gif",
        "nameduma1": "Haha"
    },
    {
        "nameduma": "https://media.discordapp.net/attachments/984111465936064522/984550866000420994/talking-ben-ben.gif",
        "nameduma1": "Hai pa! Fraiere"
    },
    {
        "nameduma": "https://media.discordapp.net/attachments/984111465936064522/984550865715232788/ugh.gif",
        "nameduma1": "nush"
    },
    {
        "nameduma": "https://c.tenor.com/3ZLujiiPc4YAAAAC/talking-ben-no.gif",
        "nameduma1": "No"
    }
]
module.exports = {
    name: "ben",
    cooldown: 5,
    run: async (nuker, msg, args) => {
        //if (!message.mentions.users.first().id !== config.developerbot && message.author.id !== config.developerbot)
        //  return message.reply('N-ai voie pe regele romaniei');
        const salkf = args.join(' ');
        if (!salkf) {
            msg.reply('<a:warned2:923160324490788897> scrie ceva');
        }
        else {
            var roll = getRndInteger(0, !msg.mentions.users.first() ? (bendume.length) : bendume.length);
            const embedben = new MessageEmbed()
                .setTitle('**You asked Ben a question..**')
                .addField(`Question:`, `> ${salkf}`, true)
                .addField(`Answer:`, `> ${bendume[roll].nameduma1}`, true)
                .setImage(bendume[roll].nameduma)
                .setColor('RANDOM')
                .setFooter({
                    text: `©️ powered by: easy-code.ro`
                })
                .setTimestamp()
            await msg.channel.send({ embeds: [embedben] });
        }
    }
}

