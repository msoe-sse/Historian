const { Botkit } = require('botkit');
require('dotenv').config();
const { SlackAdapter } = require('botbuilder-adapter-slack');
require('../config/config.js');
const sseWebApiClient = require('./sse-web-api-client.js');

const adapter = new SlackAdapter({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
    botToken: process.env.BOT_TOKEN
});

const controller = new Botkit({
    adapter: adapter
});

controller.on('slash_command', async function(bot, message) {
    switch(message.command) {
        case '/bonk':
            bot.reply(message, 'bonk');
            break;
        case '/archive_resource':
            if(global.gConfig.validChannels.includes(message.incoming_message.channelData.channel_name)) {
                const channelHistory = await bot.api.channels.history({token: process.env.SLACK_API_TOKEN, 
                                                channel: message.incoming_message.channelData.channel_id});
                const newestMessage = channelHistory.messages.find(x => x.subtype === undefined);
                
                const userInfo = await bot.api.users.info({
                    token: process.env.SLACK_API_TOKEN,
                    user: newestMessage.user
                });

                try {
                    const apiResponse = await sseWebApiClient.createSSEResource(userInfo.user.real_name, newestMessage.text);
                    bot.reply(message, apiResponse);
                } catch(err) {
                    bot.reply(message, err);
                }

            } else {
                bot.reply(message, `Error: the historian cannot archive messages in the channel ${message.incoming_message.channelData.channel_name}`);
            }
            break;
        default:
            bot.reply(message, 'unknown command');
            break;
    }
});