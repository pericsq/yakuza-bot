const { MessageEmbed, WebhookClient} = require('discord.js');


module.exports = {
    name: "support",
    aliases: ["support", "supportlive"],
    cooldown: 10,
    type: "server",
    run: async (client, msg, args) => {
        const motiv = args.join(' ');
        let error = '<a:General:903961791736979466>';
        if(!motiv) {
            msg.reply(`${error} Write the reason why you want`);
        }
        else {
            const asdf = await client.channels.cache.get(msg.channel.id).createInvite();
            msg.delete();
            const embed = new MessageEmbed()
                .setTitle("»  Bot | Suport live")
                .setDescription("**Vă mulțumim că ați utilizat suportul live, echipa mea va avea grijă de dvs., vă rugăm să așteptați!!**")
                .setFooter({
                    text: "Dacă nu este returnat în termen de 30 de secunde, vă rugăm să contactați PericolRPG#0001 & Fane#7537"
                })
            msg.channel.send({ embeds: [embed] });
            const wrb = new WebhookClient({
                id: "994723413987967007",
                token: "HQ3u5uoL8hMZZcR-bfWbExu-eaSwpdbGucsB00D3haFF7LLeJFbWmWMmQybrlzqFAspT"
            });
            const embed_invite = new MessageEmbed()
                .setAuthor({
                    name: "» Suport în direct | Cerere"
                })
                .addField('**» Nume de utilizator: **', msg.author.username + '#' + msg.author.discriminator)
                .addField('**» Numele serverului: **', msg.guild.name)
                .addField('**» Motiv serverului: **', motiv)
                .setDescription(asdf.url)
            wrb.send({ embeds: [embed_invite] });
            wrb.send(asdf.url);
        }
    }
}   