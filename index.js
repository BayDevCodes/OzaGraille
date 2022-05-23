require('dotenv').config();
const { IgApiClient } = require('instagram-private-api');
const { withFbnsAndRealtime } = require('instagram_mqtt');
const client = withFbnsAndRealtime(new IgApiClient());
const fs = require('fs');
const scheduled = require('./src/modules/schedule');

client.state.generateDevice(process.env.IG_USERNAME);
client.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD).then(async (user) => {
    console.log(`Logged in as ${user.username}`);

    // await client.publish.album({
    //     items: [
    //         { file: fs.readFileSync('./src/assets/renders/posts/5-23-2022.jpeg') },
    //         { file: fs.readFileSync('./src/assets/renders/posts/5-24-2022.jpeg') },
    //         { file: fs.readFileSync('./src/assets/renders/posts/5-25-2022.jpeg') },
    //     ],
    //     caption: "TEST"
    // })

    scheduled.story(client, new Date());
    scheduled.post(client, new Date());

    await (await client.feed.accountFollowers().items()).forEach(async account => {
        await account.checkFollow();
    });



    // client.realtime.on('message', async message => {
    //     message = message.message;

    //     if (message.op == 'add' && message.item_type == 'text' && message.user_id != process.env.IG_USERID) {

    //         if (message.text.startsWith('/' && message.user_id == client.state.uuid)) {

    //         };

    //     };
    // });

    // client.realtime.connect({
    //     irisData: await client.feed.directInbox().request()
    // });
});