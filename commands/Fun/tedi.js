const { MessageEmbed, Message } = require('discord.js');
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
module.exports = {
    name: "tedi",
    cooldown: 3,
    run: async (nuker, msg, args) => {
        if (!msg.mentions.users.first()) {
            return msg.reply(' :x: Invalid Mention');
        }
        if (msg.author.id === msg.mentions.users.first().id) {
            return msg.reply(' :x: esti prost vrei sa vezi singur cat tedi ai baut')
        }

        let valoare = getRndInteger(0, 101);
        const embed_tedi = new MessageEmbed()
            .setTitle('TEDI INFO:')
            .setDescription(args[0] + ' ' + 'a bagat supradoza de tedi' + ' ' + valoare + '%')
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter({
                text: `©️ CopyRight by Yakuza-Bot`
            })
        await msg.channel.send({ embeds: [embed_tedi] });
    }
}