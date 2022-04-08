require('dotenv').config();
// const func = require('./functions');

// const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
// const lastPosts = { "8am": 0, "2pm": 0, "4pm": 0 };

// // Loop
// setInterval(() => {
//     const now = func.time(1);

//     switch (now["d"]) {
//         // Saturday is skipped
//         case 5: break;
//         // Sunday: post weekly menus at 4pm
//         case 6:
//             if (!lastPosts["4pm"] && now["h"] === 16 && !now["m"]) {
//                 lastPosts["4pm"] += 10;
//                 console.log('Nouvelle publication pour les menus de la semaine à venir!');
//             };
//             break;
//         // Other days: post daily menu at 8am and the following one at 2pm (except on Friday)
//         default:
//             if (!lastPosts["8am"] && now["h"] === 8 && !now["m"]) {
//                 lastPosts["8am"] += 10;
//                 console.log(`Nouvelle story pour le menu de ${days[now["d"]]}!`);
//             };
//             if (!lastPosts["2pm"] && now["d"] !== 4 && now["h"] === 14 && !now["m"]) {
//                 lastPosts["2pm"] += 10;
//                 console.log(`Nouvelle story pour le menu de ${days[now["d"] + 1]}!`);
//             };
//     }

//     for (const h of Object.keys(lastPosts)) if (lastPosts[h] > 0) lastPosts[h] -= 1;

//     console.log(`Nous sommes ${days[now["d"]]} et il est ${now["h"]}:${now["m"]}.`);
// }, 10000);



const { IgApiClient } = require('instagram-private-api');
const { withFbnsAndRealtime } = require('instagram_mqtt');
const fs = require('fs');
const checkFollow = require('./modules/checkFollow');
const agent = require('./Agent');

(async () => {
    const ig = withFbnsAndRealtime(new IgApiClient());
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD).then(async () => {
        module.exports = ig;
        console.log(`${new Date()}: Connected...`);

        ig.fbns.on('push', async notif => {
            fs.appendFileSync('./src/notifs.json', JSON.stringify(notif, null, 5) + '\n\n', (error) => {
                if (error) {
                    console.log(error);
                };
            });


            if (notif.collapseKey == "new_follower") {
                checkFollow();
            };

            // if (notif.collapseKey == "direct_v2_message" && notif.pushCategory == "direct_v2_pending") {
            //     directPending();
            // };
        });
        ig.fbns.connect();



        ig.realtime.on('message', async message => {
            if (message.message.op == 'add' && message.message.item_type == 'text' && message.message.user_id != 52563195473) {
                console.log(`${new Date()}: New message from userId(${message.message.user_id}): ${message.message.text}`);

                if (message.message.text == 'Ping !') {
                    (await ig.feed.directInbox().records()).forEach(thread => {
                        if (thread.threadId == message.message.thread_id) {
                            thread.broadcastText('Pong !');
                        };
                    })
                };

                
                const result = JSON.parse(await agent(message)+"\"]");
                console.log(result[0]);
                (await ig.feed.directInbox().records()).forEach(thread => {
                    if (thread.threadId == message.message.thread_id) {
                        thread.broadcastText(result[1]);
                    };
                })
            };
        });
        ig.realtime.connect({
            irisData: await ig.feed.directInbox().request()
        });


        // //a chaque démarrage
        // await (await ig.feed.accountFollowers().items()).forEach(async account => {
        //     if (account.username == 'len_chanteur') {
        //         console.log(await account.checkFollow());
        //     };
        // });
    });
})();