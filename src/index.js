require('dotenv').config();
const { login } = require('./functions');

//login();

// first tests for the loop
setInterval(async () => {
    console.log(Math.floor(Date.now() / 1000 + 3600) % 86400);
    if (Math.floor(Date.now() / 1000 + 3600) % 86400 === 83910) console.log('time!');
}, 1000)