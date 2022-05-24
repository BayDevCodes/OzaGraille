require('dotenv').config();
const { IgApiClient } = require('instagram-private-api');
const { withFbnsAndRealtime } = require('instagram_mqtt');
const client = withFbnsAndRealtime(new IgApiClient());
const scheduled = require('./modules/schedule');

client.state.generateDevice(process.env.IG_USERNAME);
client.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD).then(async (user) => {
    console.log(`Logged in as ${user.username}`);

    const date = new Date();
    scheduled.story(client, date);
    scheduled.post(client, date);

    client.fbns.on('push', async notif => {
        if (notif.collapseKey == 'new_follower') {
            (await client.feed.accountFollowers().items()).forEach(async account => {
                await account.checkFollow();
            });
        };
    });
    client.fbns.connect();
});
