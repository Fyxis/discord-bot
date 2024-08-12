const { EmbedBuilder } = require('discord.js')
const listCommands = require('../command.json')

const help = async (message, botTag, botAvatar) => {    
    const fields = listCommands.map((commands) => ({
        name: `/${commands.name}`, value: commands.description
    }));
    
    const embed = new EmbedBuilder()
    .setColor("#cb85ff")
    .setTitle('See All Commands')
    .setURL('https://www.instagram.com/bagus.jpeg/')
    .setAuthor({ name: botTag, iconURL: botAvatar })
    .setDescription("Listen to music together with your friends anywhere on Discord Music Channel.")
    .setThumbnail(botAvatar)
    .addFields(fields)
    .setImage(botAvatar)
    .setTimestamp()
    .setFooter({ text: botTag, iconURL: botAvatar })

    await message.reply({ embeds: [embed] })
}

module.exports = help