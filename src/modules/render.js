const htmlToImage = require('node-html-to-image');
const fs = require('fs');


/**
 * @param {JSON} menu 
 */
module.exports = (menu) => {
    for (const week of Object.entries(menu)) {
        for (const day of Object.entries(week[1])) {
            if ((day[1].plat || day[1].envie || day[1].peche) && (day[1].premier || day[1].second)) {
                htmlToImage({
                    output: `./src/assets/renders/stories/${day[1].date.replace(/ /g, '').replace(/\//g, '-')}.jpeg`,
                    type: 'jpeg',
                    html: fs.readFileSync('./src/assets/story.html', 'utf8'),
                    quality: 100,
                    content: {
                        day: `${day[0].toUpperCase()} ${day[1].date.split('/')[1].replace(/ /g, '')}/${day[1].date.split('/')[0]}`,
                        plat: day[1].plat,
                        envie: day[1].envie,
                        peche: day[1].peche,
                        premier: `• ${day[1].premier}`,
                        second: `• ${day[1].second}`,

                        displayPremier: () => { if (!day[1].premier) { return "none" } else { return "flex" } },
                        displaySecond: () => { if (!day[1].second) { return "none" } else { return "flex" } },
                        displayPeche: () => { if (!day[1].peche) { return "none" } else { return "flex" } },
                        displayEnvie: () => { if (!day[1].envie) { return "none" } else { return "flex" } },
                        displayPlat: () => { if (!day[1].plat) { return "none" } else { return "flex" } },

                        borderLeftPeche: () => { if (day[1].plat || day[1].envie) { return "0" } else { return "20" } },
                        borderRightPeche: () => { if (day[1].plat || day[1].envie) { return "0" } else { return "20" } },
                        borderRightEnvie: () => { if (day[1].plat) { return "0" } else { return "20" } },
                        borderLeftEnvie: () => { if (day[1].plat) { return "0" } else { return "20" } },

                        foodHeight: () => { if (day[1].plat && day[1].envie && day[1].peche) { return "1070" } else { if ((day[1].plat && day[1].envie) || (day[1].plat && day[1].peche) || (day[1].envie && day[1].peche)) { return "800" } else { return "500" } } },

                        imageSource: 'data:image/jpeg;base64,' + new Buffer.from(fs.readFileSync('./src/assets/story_background.jpg')).toString('base64')
                    }
                }).then(async () => { console.log(`Story render for ${day[1].date.replace(/ /g, '').replace(/\//g, '-')}.jpeg complete.`) });


                htmlToImage({
                    output: `./src/assets/renders/posts/${day[1].date.replace(/ /g, '').replace(/\//g, '-')}.jpeg`,
                    type: 'jpeg',
                    html: fs.readFileSync('./src/assets/post.html', 'utf8'),
                    quality: 100,
                    content: {
                        day: `${day[0].toUpperCase()} ${day[1].date.split('/')[1].replace(/ /g, '')}/${day[1].date.split('/')[0]}`,
                        plat: day[1].plat,
                        envie: day[1].envie,
                        peche: day[1].peche,
                        premier: `• ${day[1].premier}`,
                        second: `• ${day[1].second}`,

                        displayPremier: () => { if (!day[1].premier) { return "none" } else { return "flex" } },
                        displaySecond: () => { if (!day[1].second) { return "none" } else { return "flex" } },
                        displayPeche: () => { if (!day[1].peche) { return "none" } else { return "flex" } },
                        displayEnvie: () => { if (!day[1].envie) { return "none" } else { return "flex" } },
                        displayPlat: () => { if (!day[1].plat) { return "none" } else { return "flex" } },

                        borderRightPlat: () => { if (day[1].envie || day[1].peche) { return "0" } else { return "20" } },
                        borderLeftPeche: () => { if (day[1].plat || day[1].envie) { return "0" } else { return "20" } },
                        borderRightEnvie: () => { if (day[1].plat) { return "0" } else { return "20" } },
                        borderLeftEnvie: () => { if (day[1].plat) { return "0" } else { return "20" } },

                        borderRightTitlePlat: () => { if (day[1].envie || day[1].peche) { return "0" } else { return "18" } },
                        borderLeftTitlePeche: () => { if (day[1].plat || day[1].envie) { return "0" } else { return "18" } },
                        borderRightTitleEnvie: () => { if (day[1].peche) { return "0" } else { return "18" } },
                        borderLeftTitleEnvie: () => { if (day[1].plat) { return "0" } else { return "18" } },

                        widthPlat: () => { if (day[1].envie && day[1].peche) { return "32,9" } else { if (day[1].envie || day[1].peche) { return "50" } else { return "100" } } },
                        widthPeche: () => { if (day[1].envie && day[1].plat) { return "32,9" } else { if (day[1].envie || day[1].peche) { return "50" } else { return "100" } } },
                        widthEnvie: () => { if (day[1].plat && day[1].peche) { return "32,9" } else { if (day[1].envie || day[1].peche) { return "50" } else { return "100" } } },

                        imageSource: 'data:image/jpeg;base64,' + new Buffer.from(fs.readFileSync('./src/assets/pp_background.jpg')).toString('base64')
                    }
                }).then(async () => { console.log(`Post render for ${day[1].date.replace(/ /g, '').replace(/\//g, '-')}.jpeg complete.`) });
            };
        };
    };
};