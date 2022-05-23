const fs = require('fs');
const pdfReader = require('@vtfk/pdf-text-reader');
const render = require('./render');
const { days, contents } = require('../assets/coords.json');
const months = [["janvier", 1], ["février", 2], ["mars", 3], ["avril", 4], ["mai", 5], ["juin", 6], ["juillet", 7], ["août", 8], ["septembre", 9], ["octobre", 10], ["novembre", 11], ["décembre", 12]];
let menu = {};

pdfReader(`./src/assets/menu/menu.pdf`).then(pdfData => {
    pdfData.textContent.filter(text => { return text.str != '' && text.str != ' ' && text.str != 'FALSE' }).forEach(text => {
        text.x = text.transform[4];
        text.y = text.transform[5];
        delete text.hasEOL;
        delete text.height;
        delete text.width;
        delete text.dir;
        delete text.fontName;
        delete text.transform;

        for (const day of Object.entries(days)) {
            if (text.x > day[1].min && text.x < day[1].max) {
                for (const content of Object.entries(contents)) {
                    if (text.y > content[1].min && text.y < content[1].max) {

                        if (content[0] == "date") {
                            months.forEach(month => {
                                if (text.str.includes(month[0])) {
                                    text.str = `${month[1]}/${text.str.replace(/[a-z]/gi, '')}/${new Date().getFullYear()}`;
                                };
                            });
                        };

                        if (!menu[text.page]) { menu[text.page] = {}; };
                        if (!menu[text.page][day[0]]) { menu[text.page][day[0]] = {}; };

                        if (menu[text.page][day[0]][content[0]]) {
                            menu[text.page][day[0]][content[0]] += ' ' + text.str;
                        } else {
                            menu[text.page][day[0]][content[0]] = text.str;
                        };
                    };
                };
            };
        };
    });

    if (fs.existsSync(`./src/assets/menu/menu.json`)) { fs.rmSync(`./src/assets/menu/menu.json`) };
    fs.appendFileSync(`./src/assets/menu/menu.json`, JSON.stringify(menu, null, 2));
    render(menu);
});