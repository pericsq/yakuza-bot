const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = async (client) => {
    const d =  new Date();
    const date = d.getHours() + ":" + d.getMinutes() + ", "+ d.toDateString();

    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen);
    console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen +"┃".bold.brightGreen);
    console.log(`     ┃ `.bold.brightGreen + `${client.user.tag}`.bold.brightGreen +"┃".bold.brightGreen);
    console.log(`     ┃ `.bold.brightGreen + ` ${date} ` + "┃".bold.brightGreen);
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen);

    const wrb = new WebhookClient({
        id: "995016470788571167",
        token: "w2w6ikpEVQ3RwvpHRpmHXA9Hkn7LlRYzre1jYhO__oQ2LncJcbp2jNlVC0asUEKJPQ5h"
    });
    const joinguild = new MessageEmbed()
        .setTitle('READY')
        .setDescription(`[READY]: ${client.user.username} | [TIME]: ${date}`)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://media.discordapp.net/attachments/984111465936064522/984474226385911838/giphy_1.gif')
        .setFooter({
            text: `${config.copyright}`
        })
    wrb.send({ embeds: [joinguild] });
}

