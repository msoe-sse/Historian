const { Botkit } = require('botkit');
require('dotenv').config();
const { SlackAdapter } = require('botbuilder-adapter-slack');

const adapter = new SlackAdapter({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
    botToken: process.env.BOT_TOKEN
});

const controller = new Botkit({
    adapter: adapter
});

controller.on('slash_command', function(bot, message) {
    switch(message.command) {
        case '/bonk':
            console.log(bot);
            console.log(message);
            bot.reply(message, "bonk");
            break;
        case '/archive_message':
            break;
        default:
            bot.reply(message, 'unknown command');
            break;
    };
});