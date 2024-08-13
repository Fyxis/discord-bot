/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const dotenv = require("dotenv");
const { Client, IntentsBitField, REST, Routes, Events } = require("discord.js");

const play = require("./command/play");
const join = require("./command/join");
const say = require("./command/say");
const ping = require("./command/ping");
const help = require("./command/help");
const news = require("./command/news");
const serverinfo = require("./command/serverinfo");

const listCommands = require("./command.json");

dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.APP_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
});

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: listCommands,
        });

        console.log("Bot ready to start!");
    } catch (error) {
        console.log(error);
    }
})();

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (message) => {
    if (!message.isCommand()) return;

    const { commandName: command } = message;

    switch (command) {
        case "join":
            return join(message);
        case "play":
            return play(message);
        case "say":
            return say(message);
        case "ping":
            return ping(message, client);
        case "help":
            return help(message, client.user.tag, client.user.avatarURL());
        case "news":
            return news(message);
        case "serverinfo":
            return serverinfo(message);
    }
});

client.login(TOKEN);
