const { IgApiClientMQTT } = require('instagram_mqtt');
const { existsSync, readFileSync } = require('fs');

module.exports = {
    /**
     * @param {IgApiClientMQTT} client
     * @param {Date} date
     */
    post: async (client, date) => {
        const nextTime = new Date();
        nextTime.setHours(14, 0, 0, 0);
        nextTime.setDate(date.getDate() + 7 - date.getDay());
        if (date.getDay() === 0 && date.getHours() < 14) nextTime.setDate(date.getDate());

        const schedulePublication = (delay = 1000 * 3600 * 24 * 7) => {
            setTimeout(async () => {
                const today = new Date();
                const daysToPublish = [];

                for (let i = 1; i < 6; i++) {
                    if (existsSync(`./src/assets/renders/posts/${today.getMonth() + 1}-${today.getDate() + i}-${today.getFullYear()}.jpeg`)) {
                        daysToPublish.push({ file: readFileSync(`./src/assets/renders/posts/${today.getMonth() + 1}-${today.getDate() + i}-${today.getFullYear()}.jpeg`) });
                    };
                };

                await client.publish.album({ items: daysToPublish }).catch(() => console.log('Less than 2 menus to publish this week'));
                console.log('Next publication in 7 days');
                schedulePublication();
            }, delay)
        };

        console.log(`Next publication in around ${7 - date.getDay()} day(s)`);
        schedulePublication(nextTime.valueOf() - date.valueOf());
    },

    /**
     * @param {IgApiClientMQTT} client 
     * @param {Date} date 
     */
    story: async (client, date) => {
        const nextTime = new Date();
        nextTime.setHours(8, 0, 0, 0);
        switch (nextTime.getDay()) {
            case 5:
                nextTime.setDate(date.getDate() + 3);
                break;
            case 6:
                nextTime.setDate(date.getDate() + 2);
                break;
            default:
                nextTime.setDate(date.getDate() + 1);
        };
        if (date.getDay !== 0 && date.getDay !== 6 && date.getHours() < 8) nextTime.setDate(date.getDate());

        const scheduleStory = (delay) => {
            setTimeout(async () => {
                const today = new Date();

                if (existsSync(`./src/assets/renders/stories/${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}.jpeg`)) {
                    await client.publish.story({ file: readFileSync(`./src/assets/renders/stories/${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}.jpeg`) });
                };

                switch (today.getDay()) {
                    case 5:
                        nextTime.setDate(today.getDate() + 3);
                        break;
                    case 6:
                        nextTime.setDate(today.getDate() + 2);
                        break;
                    default:
                        nextTime.setDate(today.getDate() + 1);
                };

                console.log(`Next story in ${nextTime.getDate() - today.getDate()} day(s)`);
                scheduleStory(nextTime.valueOf() - today.valueOf());
            }, delay);
        };

        console.log(`Next story in around ${~~((nextTime.valueOf() - date.valueOf()) / 1000 * 3600)} hours`);
        scheduleStory(nextTime.valueOf() - date.valueOf());
    }
};
