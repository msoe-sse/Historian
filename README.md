[![Build Status](https://travis-ci.com/msoe-sse/historian.svg?branch=master)](https://travis-ci.com/msoe-sse/historian)

# Setup
1. Join the Historian Test Slack Workspace [here](https://join.slack.com/t/ssehistoriant-9dh1349/shared_invite/enQtNzc4Nzg1MzM1MjE3LTRjYmM3ZWQ2OTRhMzU4ZTI4NmExZjlmMTRiZGRlMzhmYWM1NTA0ZDQ3YWFiYzQwMjFhZmI4YzM1M2EzNzhkYTk) and ask the webmaster for collaborator access to the test historian slack app.
2. Sign up for ngrok [here](https://dashboard.ngrok.com/signup).
3. From the getting started [page](https://dashboard.ngrok.com/get-started) after signing up download ngrok and extract it to a convinent directory.
4. Add the extracted ngrok directory to your PATH.
5. Clone the repository and navigate to your project directory in cmd or git bash.
6. Run `npm install` and then `npm run start`.
7. From cmd run `ngrok http 3000`.
8. Navgiate to the slack api page for the test historian app [here](https://api.slack.com/apps/AP5CH8WVC) and for the slash command your changing update the request url to be `<ngrok forwarding address>/api/messages`.
9. Follow the instructions of the SSE Web API [README](https://github.com/msoe-sse/sse-web-api) in order to get that running locally for testing slash commands which contact the API.