require('dotenv').config();
const func = require('./functions');

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const lastPosts = { "8am": 0, "2pm": 0, "4pm": 0 };

// func.login();

// Loop
setInterval(() => {
    const now = func.time(1);

    switch (now["d"]) {
        // Saturday is skipped
        case 5: break;
        // Sunday: post weekly menus at 4pm
        case 6:
            if (!lastPosts["4pm"] && now["h"] === 16 && !now["m"]) {
                lastPosts["4pm"] += 10;
                console.log('Nouvelle publication pour les menus de la semaine à venir!');
            };
            break;
        // Other days: post daily menu at 8am and the following one at 2pm (except on Friday)
        default:
            if (!lastPosts["8am"] && now["h"] === 8 && !now["m"]) {
                lastPosts["8am"] += 10;
                console.log(`Nouvelle story pour le menu de ${days[now["d"]]}!`);
            };
            if (!lastPosts["2pm"] && now["d"] !== 4 && now["h"] === 14 && !now["m"]) {
                lastPosts["2pm"] += 10;
                console.log(`Nouvelle story pour le menu de ${days[now["d"] + 1]}!`);
            };
    }

    for (const h of Object.keys(lastPosts)) if (lastPosts[h] > 0) lastPosts[h] -= 1;

    console.log(`Nous sommes ${days[now["d"]]} et il est ${now["h"]}:${now["m"]}.`);
}, 10000);
