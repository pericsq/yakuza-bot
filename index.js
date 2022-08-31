const Discord = require("discord.js");
const { Intents } = require('discord.js');
const colors = require("colors");
const { green } = require("chalk");
const enmap = require("enmap"); 
const fs = require("fs"); 
const OS = require('os');
const Events = require("events");
const emojis = require("./botconfig/emojis.json")
const config = require("./botconfig/config.json")
const { delay } = require("./handlers/functions")

const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  failIfNotExists: false,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b),
  presence: {
    activities: [{name: `${config.status.text}`.replace("{prefix}", config.prefix), type: config.status.type, url: config.status.url}],
    status: "online"
  }
});
const Meme = require("memer-api");

client.memer = new Meme("7Yj4j3k3K98"); 
client.la = { }

var langs = fs.readdirSync("./languages")
for(const lang of langs.filter(file => file.endsWith(".json"))){
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)

client.setMaxListeners(0);
Events.defaultMaxListeners = 0;
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

var handlers = [
  `extraevents`,
  `clientvariables`,
  `command`,
  `loaddb`,
  `events`, 
  `erelahandler`, 
  `slashCommands`
];
var social = [
  `twitterfeed`,
  `livelog`,
  `youtube`,
  `tiktok`
]
var systems = [
  `logger`, `anti_nuke`, `antidiscord`, `antilinks`,`anticaps`, `antispam`, `blacklist`, `keyword`, `antimention`, `autobackup`, // anti
  `apply`, `ticket`, `ticketevent`, `roster`, `joinvc`, `boostlog`, `welcome`, `leave`, `ghost_ping_detector`, `antiselfbot`, `jointocreate`, `reactionrole`, `ranking`, `timedmessages`,
  `membercount`, `autoembed`, `suggest`, `validcode`, `dailyfact`, `autonsfw`, `aichat`, `mute`, `automeme`, `counter`
]
function requirehandlers(){
  handlers.forEach(handler => { 
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
  social.forEach(handler=>{
    try{ require(`./social_log/${handler}`)(client); } catch (e){ console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
  systems.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
}requirehandlers();

client.on('ready', () => {
  const d = new Date();
  const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
  // Args
  console.log(green(`[READY]: ${client.user.tag} | [TIME] : ${date}`));
  const wrb = new Discord.WebhookClient({
      id: "1013912963205304320",
      token: "DmL_HhpP7UpA-zAEZVG_alHPjXvFRi_hTiA5OTwTlNZ4hMcHvdANGYC3HTdyKwLF0HzU"
  });
  const joinguild = new Discord.MessageEmbed()
      .setTitle('READY')
      .setDescription(`[READY]: ${client.user.tag} | [TIME]: ${date}`)
      .setColor('RANDOM')
      .setTimestamp()
      .setImage('https://media.discordapp.net/attachments/984111465936064522/984474226385911838/giphy_1.gif')
      .setFooter({
          text: `yakuza-bot`
      })
  wrb.send({ embeds: [joinguild] });
});
try {
  client.login(config.tokenbeta);
} catch (err) {
  console.error(err)
}
