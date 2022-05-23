const fs = require('fs');
module.exports = {
    /**
     * @param {import("instagram_mqtt").IgApiClientMQTT} client 
     * @param {Date} date 
     */
    "post": async (client, date) => {
        const sunday = new Date();
        sunday.setHours(12, 0, 50, 0);
        if (date.getDay() == 0 && (date.getHours() >= 12 && date.getMinutes() > 0)) {
            sunday.setDate(date.getDate() + (7 - date.getDay()) % 7);
            console.log(`Post sheduled for next sunday at 12 p.m`);
        } else {
            console.log('Post sheduled for today at 12 p.m');
        };
        setTimeout(() => {
            if (fs.existsSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.jpeg`)) {
                global.day1 = fs.readFileSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.jpeg`);
            } else { global.day1 = undefined };
            if (fs.existsSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 2}-${date.getFullYear()}.jpeg`)) {
                global.day2 = fs.readFileSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 2}-${date.getFullYear()}.jpeg`);
            } else { global.day2 = undefined };
            if (fs.existsSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 3}-${date.getFullYear()}.jpeg`)) {
                global.day3 = fs.readFileSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 3}-${date.getFullYear()}.jpeg`);
            } else { global.day3 = undefined };
            if (fs.existsSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 4}-${date.getFullYear()}.jpeg`)) {
                global.day4 = fs.readFileSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 4}-${date.getFullYear()}.jpeg`);
            } else { global.day4 = undefined };
            if (fs.existsSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 5}-${date.getFullYear()}.jpeg`)) {
                global.day5 = fs.readFileSync(`./src/assets/renders/posts/${date.getDate()}-${date.getMonth() + 5}-${date.getFullYear()}.jpeg`);
            } else { global.day5 = undefined };

            client.publish.album({
                items: [
                    { file: day1, width: 1080 },
                    { file: day2, width: 1080 },
                    { file: day3, width: 1080 },
                    { file: day4, width: 1080 },
                    { file: day5, width: 1080 },
                ],
            });
            console.log(`Post published`)
        }, sunday.getTime() - date.getTime());
    },

    /**
     * @param {import("instagram_mqtt").IgApiClientMQTT} client 
     * @param {Date} date 
     */
    "story": async (client, date) => {
        if (date.getHours() >= 8 && date.getMinutes() > 0) {
            const tomorrow = new Date();
            tomorrow.setDate(date.getDate() + 1);
            if (tomorrow.getDay() == 6) { //Si demain est un samedi
                tomorrow.setDate(date.getDate() + 3);
                console.log("Story scheduled for monday (in 3 days)");
            } else {
                if (tomorrow.getDay() == 0) { //Si demain est un dimanche
                    tomorrow.setDate(date.getDate() + 2);
                    console.log("Story scheduled for monday (in 2 days)");
                } else {
                    console.log("Story scheduled for tomorrow");
                };
            };
            tomorrow.setHours(8, 0, 50, 0);

            setTimeout(() => {
                client.publish.story({ file: fs.readFileSync(`./src/assets/renders/stories/${tomorrow.getDate()}-${tomorrow.getMonth()}-${tomorrow.getFullYear()}.jpeg`) });
                console.log("Story published");
            }, tomorrow.getTime() - date.getTime());
        } else {
            if (date.getDay() != 6 && date.getDay() != 0) {
                const later = new Date();
                later.setDate(date.getDate());
                later.setHours(8, 0, 50, 0);
                console.log(`Story scheduled at 8a.m (in ${later.getHours() - date.getHours()} hour(s))`);
                setTimeout(() => {
                    client.publish.story({ file: fs.readFileSync(`./src/assets/renders/stories/${later.getDate()}-${later.getMonth()}-${later.getFullYear()}.jpeg`) });
                    console.log("Story published");
                }, later.getTime() - date.getTime());
            };
        };
    }
};