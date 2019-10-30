const { Botkit } = require('botkit');
require('dotenv').config();
const { SlackAdapter } = require('botbuilder-adapter-slack');
const config = require('../config/config.js');

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
            // const channelHistory = await bot.api.channels.history({token: bot.config.bot.app_token});
            // console.log(channelHistory);
            if(global.gConfig.validChannels.includes(message.incoming_message.channelData.channel_name)) {
                bot.reply(message, "bonk");
            } else {
                bot.reply(message, `Error: the historian cannot archive messages in the channel ${message.incoming_message.channelData.channel_name}`);
            }
            break;
        case '/archive_message':
            break;
        default:
            bot.reply(message, 'unknown command');
            break;
    };
});