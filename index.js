const { App } = require("@slack/bolt");
require("dotenv").config();

console.log(process.env.SLACK_SIGNING_SECRET);

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: {
    commands: '/slack/commands'
  }
});

// // The echo command simply echoes on command
// app.command("/bonk", async ({ command, ack, say }) => {
//   // Acknowledge command request
//   ack();
//   console.log(`${command.text}`);
//   say(`${command.text}`);
// });

app.command("/bonk", async ({ command, ack, say }) => {
  // Acknowledge command request
  ack();

  console.log("bonk");
  say(`Bonk :bonk:`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
