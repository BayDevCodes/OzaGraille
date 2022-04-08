module.exports = (async () => {
    const ig = require('../index');
    (await (await ig.feed.directPending().records()).forEach(thread => {
        console.log(`${new Date()}: New direct pending ID(${thread.threadId})`);
        thread.broadcastText("Avant de pouvoir continuer, merci d'accepter notre demande d'abonement ;)");
    }));
});