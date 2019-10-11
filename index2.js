const { Botkit } = require('botkit');
require('dotenv').config();
const { SlackAdapter } = require('botbuilder-adapter-slack');

const adapter = new SlackAdapter({
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
    botToken: process.env.BOT_TOKEN
});

const controller = new Botkit({
    adapter: adapter
});

controller.on('slash_command', function(bot, message) {
    bot.replyAcknowledge();
    switch(message.command) {
        case '/bonk':
            bot.reply(message, "bonk");
            break;
        default:
            bot.reply(message, 'unknown command');
    };
});