/* eslint-disable no-undef */
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

const news = async (message) => {
    const source = message.options.getString("source");
    if (!source) return message.reply("Please choose source news!");

    const BASE_URL = process.env.NEWS_API_URL;

    try {
        const urlNews = `${BASE_URL}/${source}/terbaru`;
        const response = await axios({
            method: "GET",
            url: urlNews,
        });

        const embed = new EmbedBuilder()
            .setTitle(response.data.data.posts[0].title)
            .setDescription(response.data.data.posts[0].description)
            .setImage(response.data.data.posts[0].thumbnail)
            .setURL(response.data.data.posts[0].link);

        await message.reply({ embeds: [embed] });
    } catch (error) {
        console.error(`Error fetching api : ${error}`);
    }
};

module.exports = news;
