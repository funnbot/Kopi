try { var { Client } = require("discord.js"); }
catch { console.exception("Discord.js was not installed."); }

try { var settings = require("./settings.json"); }
catch { console.exception("settings.json not found in root."); }

const bot = new Client({
    fetchAllMembers: true
});

const TOKEN_REGEX = new RegExp(settings.token, "gim");
const ROLE_REGEX = /<@\d{17,19}>/;
let MENTION_REGEX;
bot.on("ready", () => {
    MENTION_REGEX = new RegExp(`<@!?${bot.id}>`);
    console.log("I Am.");
})

const COMMANDS = {
    "list": {
        help: "List the available roles.",
        exec: async (m, args) => {

        }
    },
    "assign": {
        help: "Assign a role",
        exec: async (m, args) => {

        }
    },
    "remove": {
        help: "Remove a role",
        exec: async (m, args) => {

        }
    },
    "reload": { // SPOOK (admin check)
        help: "Reload the settings cache.",
        exec: async (m, args) => {
            // Special people
            if (!settings.admins.contains(m.author.id)) return;
        }
    },
    "eval": { // DOUBLE SPOOK
        help: "Eval a scary bit of javascript",
        exec: async (m, args) => {
            // OG VIP
            if (m.author.id != settings.owner) return;
            const code = 
        }
    }
}

bot.on("message", message => {
    // Stinky bots
    if (message.author.bot) return;
    // Only allowed in whitelisted channels
    if (!settings.channels.contains(message.channel.id)) return;
    // Stinky people
    if (settings.blacklist.contains(message.author.id)) return;

    // * NOTE: cleanContent might create errors *
    const content = message.cleanContent;

    const args = message.cleanContent.split(' ');

    // Prefix check
    if (!settings.prefix.length || !content.startsWith(settings.prefix)) {
        // Mention check, if valid, mention will be sliced from args
        if (MENTION_REGEX.test(args[0])) {
            args = args.slice(1);
        } else return; // Otherwise this is not a command.
    } else {
        args[0] = args[0].slice(settings.prefix.length);
    }

    const cmd = args.shift();

    if (COMMANDS.hasOwnProperty(cmd)) {
        try {
            await COMMANDS[cmd].exec(message, args.slice(1));
        } catch (e) {
            console.error(`Command ${cmd} error: ${e}`);
        }
    }
});

bot.login(settings.token)
    .catch(console.error);

