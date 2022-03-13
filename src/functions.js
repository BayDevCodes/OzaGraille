const { readFileSync } = require('fs');
const { IgApiClient } = require('instagram-private-api');

const ig = new IgApiClient();

module.exports = {
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
    }
};
