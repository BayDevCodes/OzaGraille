const htmlToImage = require('node-html-to-image');
const { readFileSync } = require('fs');

/**
 * @param {JSON} menu 
 */
module.exports = (menu) => {
    for (const week of Object.entries(menu)) {
        for (const day of Object.entries(week[1])) {
            if ((day[1].plat || day[1].envie || day[1].peche) && (day[1].premier || day[1].second)) {
                htmlToImage({
                    output: `./src/assets/renders/stories/${day[1].date.replace(/ 0/g, '').replace(/ /g, '').replace(/\//g, '-')}.jpeg`,
                    type: 'jpeg',
                    html: readFileSync('./src/assets/story.html', 'utf8'),
                    quality: 100,
                    content: {
                        day: `${day[0].toUpperCase()} ${day[1].date.split('/')[1].replace(/ /g, '')}/${day[1].date.split('/')[0]}`,
                        plat: day[1].plat,
                        envie: day[1].envie,
                        peche: day[1].peche,
                        premier: `• ${day[1].premier}`,
                        second: `• ${day[1].second}`,

                        displayPremier: day[1].premier ? "flex" : "none",
                        displaySecond: day[1].second ? "flex" : "none",
                        displayPeche: day[1].peche ? "flex" : "none",
                        displayEnvie: day[1].envie ? "flex" : "none",
                        displayPlat: day[1].plat ? "flex" : "none",

                        borderLeftPeche: day[1].plat || day[1].envie ? "0" : "20",
                        borderRightPeche: day[1].plat || day[1].envie ? "0" : "20",
                        borderRightEnvie: day[1].plat ? "0" : "20",
                        borderLeftEnvie: day[1].plat ? "0" : "20",

                        foodHeight: day[1].plat && day[1].envie && day[1].peche ? "1070" : (day[1].plat && day[1].envie) || (day[1].plat && day[1].peche) || (day[1].envie && day[1].peche) ? "800" : "500",

                        imageSource: 'data:image/jpeg;base64,' + new Buffer.from(readFileSync('./src/assets/story_background.jpg')).toString('base64')
                    }
                }).then(() => { console.log(`Story render for ${day[1].date.replace(/ /g, '').replace(/\//g, '-')}.jpeg complete.`) });

                htmlToImage({
                    output: `./src/assets/renders/posts/${day[1].date.replace(/ 0/g, '').replace(/ /g, '').replace(/\//g, '-')}.jpeg`,
                    type: 'jpeg',
                    html: readFileSync('./src/assets/post.html', 'utf8'),
                    quality: 100,
                    content: {
                        day: `${day[0].toUpperCase()} ${day[1].date.split('/')[1].replace(/ /g, '')}/${day[1].date.split('/')[0]}`,
                        plat: day[1].plat,
                        envie: day[1].envie,
                        peche: day[1].peche,
                        premier: `• ${day[1].premier}`,
                        second: `• ${day[1].second}`,

                        displayPremier: day[1].premier ? "flex" : "none",
                        displaySecond: day[1].second ? "flex" : "none",
                        displayPeche: day[1].peche ? "flex" : "none",
                        displayEnvie: day[1].envie ? "flex" : "none",
                        displayPlat: day[1].plat ? "flex" : "none",

                        borderRightPlat: day[1].envie || day[1].peche ? "0" : "20",
                        borderLeftPeche: day[1].plat || day[1].envie ? "0" : "20",
                        borderRightEnvie: day[1].plat ? "0" : "20",
                        borderLeftEnvie: day[1].plat ? "0" : "20",

                        borderRightTitlePlat: day[1].envie || day[1].peche ? "0" : "18",
                        borderLeftTitlePeche: day[1].plat || day[1].envie ? "0" : "18",
                        borderRightTitleEnvie: day[1].peche ? "0" : "18",
                        borderLeftTitleEnvie: day[1].plat ? "0" : "18",

                        widthPlat: day[1].envie && day[1].peche ? "32,9" : day[1].envie || day[1].peche ? "50" : "100",
                        widthPeche: day[1].envie && day[1].plat ? "32,9" : day[1].envie || day[1].peche ? "50" : "100",
                        widthEnvie: day[1].plat && day[1].peche ? "32,9" : day[1].envie || day[1].peche ? "50" : "100",

                        imageSource: 'data:image/jpeg;base64,' + new Buffer.from(readFileSync('./src/assets/pp_background.jpg')).toString('base64')
                    }
                }).then(async () => { console.log(`Post render for ${day[1].date.replace(/ /g, '').replace(/\//g, '-')}.jpeg complete.`) });
            };
        };
    };
};
