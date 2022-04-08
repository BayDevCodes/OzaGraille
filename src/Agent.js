const config = require("./config.json");

module.exports = async (message) => {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: config.token,
    });
    const openai = new OpenAIApi(configuration);

    console.log(`\n${message.message.user_id}: ${message.message.text}\n${JSON.stringify(config.notif)}\n`);

    const response = await openai.createCompletion("text-davinci-002", {
        prompt: config.prompt+`\n\n${message.message.user_id}: ${message.message.text}\n${JSON.stringify(config.notif)}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\"]"]
    });

    return response.data.choices.at(0).text;
};