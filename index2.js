const Botkit = require('botkit');
require('dotenv').config();

const controller = Botkit.slackbot({
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET
});

controller.configureSlackApp({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
    scopes: ['commands']
});

controller.setupWebserver(process.env.PORT || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(controller.webserver);
    controller.createOauthEndpoints(controller.webserver,
        function(err, req, res) {
            if(err) {
                res.status(500).send('ERROR: ' + err);
            } else {
                res.send('Success!');
            }
        });
});

const bot = controller.spawn({
    token: process.env.BOT_TOKEN
}).startRTM();

controller.on('slash_command', function(bot, message) {
    bot.replyAcknowledge();
    switch(message.command) {
        case '/bonk':
            bot.reply(message, "bonk");
            break;
    };
});