const { readFileSync } = require('fs');
const { IgApiClient } = require('instagram-private-api');
const { withRealtime, withFbns, withFbnsAndRealtime } = require('instagram_mqtt');
const { DirectRepository } = require('instagram-private-api/dist/repositories/direct.repository');

const ig = withFbns(new IgApiClient());

module.exports = {
    test: async () => {
        ig.fbns.on('direct', content => {
            console.log(content);
        });
    },


    /** Logs into the Instagram account. */
    login: async () => {
        ig.state.generateDevice(process.env.IG_USERNAME);
        const res = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

        console.log(`Connected to Instagram as ${res.username}!`);
    },

    /**
     * Publishes a new post on the account.
     * @param {Buffer} picture
     * @param {String} description
     */
    newPost: async (picture, description) => {
        await ig.publish.photo({
            caption: description,
            file: picture,
            location: undefined,
            usertags: undefined
        });
    },

    /**
     * Publishes a new story on the account.
     * @param
     */
    newStory: async () => {
        ig.publish.story({
            caption: undefined,
            chat: undefined,
            countdown: undefined,
            file: undefined,
            hashtags: undefined,
            link: undefined,
            location: undefined,
            media: undefined,
            mentions: undefined,
            poll: undefined,
            question: undefined,
            quiz: undefined,
            recipientUsers: undefined,
            replyType: undefined,
            slider: undefined,
            stickerConfig: undefined,
            threadIds: undefined,
            toBesties: undefined,
            viewMode: undefined
        });
    },

    /**
     * Returns the current time.
     * @param {Number} timezone offset from the UTC time zone
     * @returns {any} The current day of the week and time
     */
    time: (timezone) => {
        let timestamp = ~~(Date.now() / 1000 + timezone * 3600); // seconds since epoch
        const day = ~~(timestamp / 86400 + 3) % 7; // day of the week

        timestamp %= 86400; // seconds since midnight
        const hours = ~~(timestamp / 3600);

        timestamp %= 3600;
        const minutes = ~~(timestamp / 60);

        return { "d": day, "h": hours, "m": minutes };
    }
};
