module.exports = (async () => {
    const ig = require('../index');
    const followers = await ig.feed.accountFollowers().items()
    console.log(`${new Date()}: Check follow for ${followers.length} accounts...`);
    followers.forEach(async account => {
        account.checkFollow();
    });
});