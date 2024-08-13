const { OpenAI } = require("openai");

const say = async (message) => {
    const content = message.options.getString("content");
    if (!content) return;

    const config = new OpenAI({
        apiKey: process.env.AI_API_KEY,
        baseURL: "https://api.aimlapi.com",
    });

    try {
        await message.reply(`${content}`);
        const chatCompletion = await config.chat.completions.create({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [
                {
                    role: "system",
                    content:
                        "Be descriptive and helpful. Maximal 1950 character.",
                },
                {
                    role: "user",
                    content: content,
                },
            ],
            temperature: 0.7,
            max_tokens: 130,
        });
        const aiResponse = chatCompletion.choices[0].message.content;
        await message.channel.send(aiResponse);
    } catch (error) {
        console.error("OpenAI Api error:", error);
    }
};
module.exports = say;
