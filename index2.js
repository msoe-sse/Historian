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

controller.setupWebserver(process.env.PORT || 3000, function (err, webserver) {
    if (err) process.exit(1);

    webserver.use(function (req, res, next) {
        next();
    });
    controller.createWebhookEndpoints(webserver);
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