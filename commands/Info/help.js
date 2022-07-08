const {
  MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration, handlemsg
} = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {

    let settings = client.settings.get(message.guild.id);
    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language");

    try {
      if (args[0]) {
        const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (args[0].toLowerCase().includes("cust")) {
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = [handlemsg(client.la[ls].cmds.info.help.error1)]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable1"]))
            .setDescription(items.join("︲"))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom), client.user.displayAvatarURL());

          message.reply({ embeds: [embed] })
          return;
        } var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.reply({ embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, { command: args[0].toLowerCase() }))] });
        } else if (cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable2"]))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom, { prefix: prefix }), client.user.displayAvatarURL());
          let embeds = allotherembeds_eachcategory();
          if (cat == "🔰 Info")
            return message.reply({ embeds: [embeds[0]] })
          if (cat == "💸 Economy")
            return message.reply({ embeds: [embeds[1]] })
          if (cat == "🏫 School Commands")
            return message.reply({ embeds: [embeds[2]] })
          if (cat == "🎶 Music")
            return message.reply({ embeds: [embeds[3]] })
          if (cat == "👀 Filter")
            return message.reply({ embeds: [embeds[4]] })
          if (cat == "⚜️ Custom Queue(s)")
            return message.reply({ embeds: [embeds[5]] })
          if (cat == "🚫 Administration")
            return message.reply({ embeds: [embeds[6]] })
          if (cat == "💪 Setup")
            return message.reply({ embeds: [embeds[7]] })
          if (cat == "⚙️ Settings")
            return message.reply({ embeds: [embeds[8]] })
          if (cat == "👑 Owner")
            return message.reply({ embeds: [embeds[9]] })
          if (cat == "⌨️ Programming")
            return message.reply({ embeds: [embeds[10]] })
          if (cat == "📈 Ranking")
            return message.reply({ embeds: [embeds[11]] })
          if (cat == "🔊 Soundboard")
            return message.reply({ embeds: [embeds[12]] })
          if (cat == "🎤 Voice")
            return message.reply({ embeds: [embeds[13]] })
          if (cat == "🕹️ Fun")
            return message.reply({ embeds: [embeds[14]] })
          if (cat == "🎮 MiniGames")
            return message.reply({ embeds: [embeds[15]] })
          if (cat == "😳 Anime-Emotions")
            return message.reply({ embeds: [embeds[16]] })
          if (cat == "🔞 NSFW")
            return message.reply({ embeds: [embeds[17]] })
          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable3"]));
            } catch { }
          } else {
            embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable4"]))
          }
          return message.reply({ embeds: [embed] })
        }
        if (cmd.name) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.name), `\`\`\`${cmd.name}\`\`\``);
        if (cmd.name) embed.setTitle(handlemsg(client.la[ls].cmds.info.help.detail.about, { cmdname: cmd.name }));
        if (cmd.description) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.desc), `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases && cmd.aliases.length > 0 && cmd.aliases[0].length > 1) try {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.aliases), `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch { }
        if (cmd.cooldown) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.usage), `\`\`\`${prefix}${cmd.usage}\`\`\``);
          embed.setFooter(handlemsg(client.la[ls].cmds.info.help.detail.syntax), es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL());
        }
        return message.reply({ embeds: [embed] });
      } else {
        let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("921369338630524938").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.back))
        let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("905094802142560286").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.home))
        let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji("921369291771772968").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.forward))
        let button_tutorial = new MessageButton().setStyle('LINK').setEmoji("921369059738677268").setLabel("Dashboard").setURL("https://yakuza.easy-code.ro")
        let menuOptions = [
          {
            label: "Overview",
            value: "Overview",
            emoji: "902091899802910760",
            description: ""
          },
          {
            label: "Information",
            value: "Information",
            emoji: "902557664263946290",
            description: ""
          },
          {
            label: "Economy",
            value: "Economy",
            emoji: "939812353132867594",
            description: ""
          },
          {
            label: "School",
            value: "School",
            emoji: "957248138186469376",
            description: "" 
          },
          {
            label: "Music",
            value: "Music",
            emoji: "902096778134974464",
            description: ""
          },
          {
            label: "Filter",
            value: "Filter",
            emoji: "908577642968649728",
            description: ""
          },
          {
            label: "Customqueue",
            value: "Customqueue",
            emoji: "902534968864043028",
            description: ""
          },
          {
            label: "Admin",
            value: "Admin",
            emoji: "939801632537972796",
            description: ""
          },
          {
            label: "Setup",
            value: "Setup",
            emoji: "939800180146978897",
            description: ""
          },
          {
            label: "Settings",
            value: "Settings",
            emoji: "939814005067890739",
            description: ""
          },
          {
            label: "Owner",
            value: "Owner",
            emoji: "905096703839973446",
            description: ""
          },
          {
            label: "Programming",
            value: "Programming",
            emoji: "979019199647195167",
            description: ""
          },
          {
            label: "Ranking",
            value: "Ranking",
            emoji: "951665482484826152",
            description: ""
          },
          {
            label: "Soundboard",
            value: "Soundboard",
            emoji: "939814102799376424",
            description: ""
          },
          {
            label: "Voice",
            value: "Voice",
            emoji: "921368071455772692",
            description: ""
          },
          {
            label: "Fun",
            value: "Fun",
            emoji: "940586502323306546",
            description: ""
          },
          {
            label: "Minigames",
            value: "Minigames",
            emoji: "947105354444046356",
            description: ""
          },
          {
            label: "Anime-Emotions",
            value: "Anime-Emotions",
            emoji: "986419131521826886",
            description: ""
          },
          {
            label: "Nsfw",
            value: "Nsfw",
            emoji: "951667326808379412",
            description: ""          
          },
          {
            label: "Customcommand",
            value: "Customcommand",
            emoji: "939809599895265290",
            description: ""
          },
        ];
        menuOptions = menuOptions.map(i => {
          if (settings[`${i?.value.toUpperCase()}`] === undefined) {
            return i; //if its not in the db, then add it
          }
          else if (settings[`${i?.value.toUpperCase()}`]) {
            return i; //If its enabled then add it
          }
          else if (settings.showdisabled && settings[`${i?.value.toUpperCase()}`] === false) {
            return i;
          } else {
            //return i // do not return, cause its disabled! to be shown
          }
        })
        let menuSelection = new MessageSelectMenu()
          .setCustomId("MenuSelection")
          .setPlaceholder("Click me to view all commands")
          .setMinValues(1)
          .setMaxValues(5)
          .addOptions(menuOptions.filter(Boolean))
        let buttonRow = new MessageActionRow().addComponents([button_back, button_home, button_forward, button_tutorial])
        let SelectionRow = new MessageActionRow().addComponents([menuSelection])
        const allbuttons = [buttonRow, SelectionRow]

        //Emoji's
          let developer = "<a:developer_badge1:920277896273219596>";
          let ping = "<a:892077506860040233:906542273859289179>";
          let upstatus = "<:upstatus:917371983849717801>";
          let commands = "<:bot_flag:908577162712477737>";
          let youtube = "<:YouTube:902093445278097428>";
          let tickete = "<:ticket_1:920276597171433535>";
          let admin = "<:Moderation:905097097911607317>";
          let music = "<a:MUSIC1:902096778134974464>";
          let welcome = "<a:door_welcome:920302698841116712>";
        //define default embed
        let OverviewEmbed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setFooter({ 
              text: "Page Overview\n" + client.user.username, 
              iconURL: client.user.displayAvatarURL() 
            })
            .setTitle(`Information about __${client.user.username}__`)
            .addField(":muscle: **__My Features__**",
                `>>> **58+ Systems:**\n${youtube} **Youtube-Auto-Poster**\n${tickete} **Ticket**\n${welcome} **Welcome-Images** and **Reaction Role**\n${music} **Music System** with **Audio Filtering**\n${admin} **Administration** and **Auto-Moderation** and way much more!`)
          //.setFooter("Page Overview\n"+ client.user.username, client.user.displayAvatarURL())

            .addField("<a:loading1:902096844732133376> **__How do you use me ?__**",
            `>>> \`${prefix}setup\` and react with the Emoji for the right action,
but you can also do \`${prefix}setup-SYSTEM\` e.g. \`${prefix}setup-welcome\``)
          .addField(":chart_with_upwards_trend: **__STATS:__**",
            `>>> <:bot_flag:908577162712477737> **${client.commands.map(a => a).length} Commands**
            <:Discord:902094559423631380> on **${client.guilds.cache.size} Guilds**
            <:upstatus:917371983849717801> **${duration(client.uptime).map(i => `\`${i}\``).join("︲")} Uptime**
            <a:892077506860040233:906542273859289179> **\`${Math.floor(client.ws.ping)}ms\` Ping**
            <a:developer_badge1:920277896273219596> Made by [Easy Code](https://easy-code.ro)`)
          .addField("How to get help?", `>>> **\` 1. Way \`** *Use the Buttons, to swap the Pages*\n**\` 2. Way \`** *Use the Menu to select all Help Pages, you want to display*`)

        let err = false;
        //Send message with buttons
        let helpmsg = await message.reply({
          content: `***Click on the __Buttons__ to swap the Help-Pages***`,
          embeds: [OverviewEmbed],
          components: allbuttons
        }).catch(e => {
          err = true;
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          return message.reply(`:x: I couldn't send help? Maybe I am missing the Permission to **EMBED LINKS**`).catch(() => { })
        });
        if (err) return;
        var edited = false;
        var embeds = [OverviewEmbed]
        for (const e of allotherembeds_eachcategory(true))
          embeds.push(e)
        let currentPage = 0;

        //create a collector for the thinggy
        const collector = helpmsg.createMessageComponentCollector({ filter: (i) => (i?.isButton() || i?.isSelectMenu()) && i?.user && i?.message.author.id == client.user.id, time: 180e3 });
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        collector.on('collect', async b => {
          try {
            if (b?.isButton()) {
              if (b?.user.id !== message.author.id)
                return b?.reply({ content: handlemsg(client.la[ls].cmds.info.help.buttonerror, { prefix: prefix }), ephemeral: true });

              //page forward
              if (b?.customId == "1") {
                //b?.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
                if (currentPage !== 0) {
                  currentPage -= 1
                } else {
                  currentPage = embeds.length - 1
                }
              }
              //go home
              else if (b?.customId == "2") {
                //b?.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
                currentPage = 0;
              }
              //go forward
              else if (b?.customId == "3") {
                //b?.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
                if (currentPage < embeds.length - 1) {
                  currentPage++;
                } else {
                  currentPage = 0
                }
              }
              await helpmsg.edit({ embeds: [embeds[currentPage]], components: allbuttons }).catch(e => { })
              b?.deferUpdate().catch(e => { })


            }
            if (b?.isSelectMenu()) {
              //b?.reply(`***Going to the ${b?.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
              //information, music, admin, settings, voice, minigames, nsfw
              let index = 0;
              let vembeds = []
              let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
              for (const value of b?.values) {
                switch (value.toLowerCase()) {
                  case "overview": index = 0; break;
                  case "information": index = 1; break;
                  case "economy": index = 2; break;
                  case "school": index = 3; break;
                  case "music": index = 4; break;
                  case "filter": index = 5; break;
                  case "customqueue": index = 6; break;
                  case "admin": index = 7; break;
                  case "setup": index = 8; break;
                  case "settings": index = 9; break;
                  case "owner": index = 10; break;
                  case "programming": index = 11; break;
                  case "ranking": index = 12; break;
                  case "soundboard": index = 13; break;
                  case "voice": index = 14; break;
                  case "fun": index = 15; break;
                  case "minigames": index = 16; break;
                  case "anime-emotions": index = 17; break;
                  case "nsfw": index = 18; break;
                  case "customcommand": index = 19; break;
                }
                vembeds.push(theembeds[index])
              }
              b?.reply({
                embeds: vembeds,
                ephemeral: true
              });
            }
          } catch (e) {
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
            console.log(String(e).italic.italic.grey.dim)
          }
        });

        collector.on('end', collected => {
          //array of all disabled buttons
          let d_buttonRow = new MessageActionRow().addComponents([button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true), button_tutorial])
          const alldisabledbuttons = [d_buttonRow]
          if (!edited) {
            edited = true;
            helpmsg.edit({ content: handlemsg(client.la[ls].cmds.info.help.timeended, { prefix: prefix }), embeds: [helpmsg.embeds[0]], components: alldisabledbuttons }).catch((e) => { })
          }
        });
      }
      function allotherembeds_eachcategory(filterdisabled = false) {
        //ARRAY OF EMBEDS
        var embeds = [];

        //INFORMATION COMMANDS
        var embed0 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔰 Info").size}\`] 🔰 Information Commands 🔰`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔰 Info").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField(`<:arrow:905708227998670868> **User Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "user").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:arrow:905708227998670868> **Games Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "games").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:arrow:905708227998670868> **Server Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "server").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:arrow:905708227998670868> **Bot Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "bot").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:arrow:905708227998670868> **Util Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "util").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed0)

        //ECONOMY COMMANDS
        var embed1 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💸 Economy").size}\`] 💸 Economy Commands 💸 | ${settings.ECONOMY ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💸 Economy").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField(`<:arrow:905708227998670868> **Mini Game to earn 💸**`, ">>> " + client.commands.filter((cmd) => cmd.category === "💸 Economy" && cmd.type === "game").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:arrow:905708227998670868> **Repeatingly earn 💸 via Event(s)**`, ">>> " + client.commands.filter((cmd) => cmd.category === "💸 Economy" && cmd.type === "earn").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:arrow:905708227998670868> **Information & Manage 💸**`, ">>> " + client.commands.filter((cmd) => cmd.category === "💸 Economy" && cmd.type === "info").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        if (!filterdisabled || settings.ECONOMY || settings.showdisabled) embeds.push(embed1)

        //SCHOOL COMMANDS
        var embed2 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").size}\`] 🏫 School Commands 🏫 | ${settings.SCHOOL ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField(`<:arrow:905708227998670868> **Mathematics**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🏫 School Commands" && cmd.type === "math").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField(`<:arrow:905708227998670868> **Time Management**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🏫 School Commands" && cmd.type === "time").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        if (!filterdisabled || settings.SCHOOL || settings.showdisabled) embeds.push(embed2)

        //MUSIC COMMANDS type: song, queue, queuesong, bot
        var embed3 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎶 Music").size}\`] 🎶 Music Commands 🎶 | ${settings.MUSIC ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎶 Music").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **Queue Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type.includes("queue")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Song Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type.includes("song")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Bot Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type.includes("bot")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        if (!filterdisabled || settings.MUSIC || settings.showdisabled) embeds.push(embed3)

        //FILTER COMMANDS
        var embed4 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👀 Filter").size}\`] 👀 Filter Commands 👀 | ${settings.FILTER ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👀 Filter").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.FILTER || settings.showdisabled) embeds.push(embed4)

        //CUSTOM QUEUE COMMANDS
        var embed5 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").first().extracustomdesc.length}\`] ⚜️ Custom Queue(s) Commands ⚜️ | ${settings.CUSTOMQUEUE ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").first().extracustomdesc.split(",").map(i => i?.trim()).join("︲")}*`)
          .addField("\u200b", "\u200b")
          .addField("<a:success:902091899802910760>  **Usage**", "> " + client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").first().usage)
        if (!filterdisabled || settings.CUSTOMQUEUE || settings.showdisabled) embeds.push(embed5)

        //ADMINISTRATION
        var embed6 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🚫 Administration").size}\`] 🚫 Admin Commands 🚫`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🚫 Administration").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **Server Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("server")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Channel Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("channel")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Thread Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("thread")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Role Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("role")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Member Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("member")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed6)

        //SETUP
        var embed7 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💪 Setup").size}\`] 💪 Setup Commands 💪`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💪 Setup").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **Setups for Entertainment**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("fun")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Information & Manage (Bot/Server) Settings**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("info")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Most used Systems**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("system")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Security Systems**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("security")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed7)

        //Settings
        var embed8 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").size}\`] ⚙️ Settings Commands ⚙️`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **User Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type.includes("user")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Bot Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type.includes("bot")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Music Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type.includes("music")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed8)

        //Owner
        var embed9 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👑 Owner").size}\`] 👑 Owner Commands 👑`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👑 Owner").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **Information & Manage**", "> " + client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type.includes("info")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Adjust the Bot**", "> " + client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type.includes("bot")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        embeds.push(embed9)

        //Programming Commands
        var embed10 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⌨️ Programming").size}\`] ⌨️ Programming Commands ⌨️ | ${settings.PROGRAMMING ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⌨️ Programming").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.PROGRAMMING || settings.showdisabled) embeds.push(embed10)

        //Ranking
        var embed11 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "📈 Ranking").size}\`] 📈 Ranking Commands 📈 | ${settings.RANKING ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "📈 Ranking").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **Manage Rank**", `> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking" && cmd.type === "manage").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
          .addField("<:arrow:905708227998670868> **Rank Information**", `> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking" && cmd.type === "info").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        if (!filterdisabled || settings.RANKING || settings.showdisabled) embeds.push(embed11)

        //SOUNDBOARD COMMANDS
        var embed12 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").size}\`] 🔊 Soundboard Commands 🔊 | ${settings.SOUNDBOARD ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.SOUNDBOARD || settings.showdisabled) embeds.push(embed12)

        //Voice COMMANDS
        var embed13 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().extracustomdesc.length}\`] 🎤 Voice Commands 🎤 | ${settings.VOICE ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().extracustomdesc.split(",").map(i => i?.trim()).join("︲")}*`)
          .addField("\u200b", "\u200b")
          .addField("<a:success:902091899802910760>  **Usage**", "> " + client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().usage)
        if (!filterdisabled || settings.VOICE || settings.showdisabled) embeds.push(embed13)

        //FUN COMMANDS
        var embed14 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").size}\`] 🕹️ Fun Commands 🕹️ | ${settings.FUN ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **Fun User Image Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "user").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Fun User Image-Text Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "usertext").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Fun Text Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "text").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        if (!filterdisabled || settings.FUN || settings.showdisabled) embeds.push(embed14)

        //MINIGAMES
        var embed15 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").size}\`] 🎮 Mini Games Commands 🎮 | ${settings.MINIGAMES ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **Text Based Minigames**", "> " + client.commands.filter((cmd) => cmd.category === "🎮 MiniGames" && cmd.type === "text").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Button(s) Minigames**", "> " + client.commands.filter((cmd) => cmd.category === "🎮 MiniGames" && cmd.type === "buttons").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .addField("<:arrow:905708227998670868> **Voice Minigames**", "> " + client.commands.filter((cmd) => cmd.category === "🎮 MiniGames" && cmd.type === "voice").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.MINIGAMES || settings.showdisabled) embeds.push(embed15)

        //ANIME EMOTIONS
        var embed16 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "😳 Anime-Emotions").size}\`] 😳 Anime Commands 😳 | ${settings.ANIME ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "😳 Anime-Emotions").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **Anime-Mention-Emotions (or Self.)**", `> ${client.commands.filter((cmd) => cmd.category === "😳 Anime-Emotions" && cmd.type === "mention").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
          .addField("<:arrow:905708227998670868> **Anime-Self-Emotions**", `> ${client.commands.filter((cmd) => cmd.category === "😳 Anime-Emotions" && cmd.type === "self").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        if (!filterdisabled || settings.ANIME || settings.showdisabled) embeds.push(embed16)

        //NSFW COMMANDS
        var embed17 = new MessageEmbed()
          .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔞 NSFW").size}\`] 🔞 NSFW Commands 🔞 | ${settings.NSFW ? "<a:success:902091899802910760> ENABLED" : "<a:Error:902091954425298956> DISABLED"}`)
          .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔞 NSFW").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField("\u200b", "__**Sub-Categorized Commands:**__")
          .addField("<:arrow:905708227998670868> **Animated (Hentai, Neko, SFW, ...)**", `> ${client.commands.filter((cmd) => cmd.category === "🔞 NSFW" && cmd.type === "anime").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
          .addField("<:arrow:905708227998670868> **Reallife (Porn, Erotik, etc.)**", `> ${client.commands.filter((cmd) => cmd.category === "🔞 NSFW" && cmd.type === "real").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
        if (!filterdisabled || settings.NSFW || settings.showdisabled) embeds.push(embed17)

        //CUSTOM COMMANDS EMBED
        var embed18 = new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable23"]))
        let cuc = client.customcommands.get(message.guild.id, "commands");
        if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
        else cuc = cuc.map(cmd => `\`${cmd.name}\``)
        const items = cuc
        embed18.setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable24"]))
        embed18.setDescription(">>> " + items.join("︲"))
        embeds.push(embed18)

        return embeds.map((embed, index) => {
          return embed
            .setColor(es.color)
            .setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setFooter(client.getFooter(`Page ${index + 1} / ${embeds.length}\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL()));
        })
      }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
        ]
      });
    }
  }
}
/**
 * @INFO
 * Bot Coded by Easy Code | https://easy-code.ro
 * @INFO
 * Work for Easy Code | https://easy-code.ro
 * @INFO
 * Please mention him / Easy Code, when using this Code!
 * @INFO
 */
