require('dotenv').config();
const { IgApiClient } = require('instagram-private-api');

const ig = new IgApiClient();

const login = async () => {
    ig.state.generateDevice(process.env.IG_USERNAME);
    console.log(await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD));
};

login();