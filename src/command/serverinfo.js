const { EmbedBuilder, PresenceUpdateStatus } = require("discord.js");
const moment = require("moment");

const serverinfo = async (message) => {
    // const totalOnline = message.guild.members
    //     .fetch({ withPresences: true })
    //     .then((fetchedMembers) => {
    //         return fetchedMembers.filter(
    //             (member) =>
    //                 member.presence?.status === PresenceUpdateStatus.Online
    //         );
    //     });

    // console.log(totalOnline);
    const embed = new EmbedBuilder()
        .setTitle(`Server Info`)
        .setDescription("**Genaral**")
        .setColor("#000000")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields({ name: "Name :", value: message.guild.name })
        .addFields({
            name: "Boost Tier :",
            value: message.guild.premiumTier
                ? `Tier ${message.guild.premiumTier}`
                : "Server not boosted",
        })
        .addFields({
            name: "Time Created :",
            value: `${moment(message.guild.createdTimestamp).format(
                "LT"
            )} | ${moment(message.guild.createdTimestamp).format(
                "LL"
            )} | ${moment(message.guild.createdTimestamp).fromNow()}`,
        })
        // .addFields({
        //     name: "Online :",
        //     value: "totalOnline",
        // })
        // .setDescription("**Statistics**")
        // .addFields({ name: "Role Count :", value: roles })
        // .addFields({
        //     name: "Emojis Count :",
        //     value: message.guild.emojis.cache,
        // })
        // .addFields({
        //     name: "Human",
        //     value: members.filter((member) => !member.user.bot).size,
        // })
        // .addFields({
        //     name: "Bots",
        //     value: members.filter((member) => member.user.bot).size,
        // })
        // .addFields("General", [
        //     `**Name:** ${message.guild.name}`,
        //     `**ID:** ${message.guild.id}`,
        //     `**Owner:** ${owner} (${ownerId})`,
        //     `**Boost Tier:** ${
        //         message.guild.premiumTier
        //             ? `Tier ${message.guild.premiumTier}`
        //             : "None"
        //     }`,
        //     `**Time Created:** ${moment(message.guild.createdTimestamp).format(
        //         "LT"
        //     )} ${moment(message.guild.createdTimestamp).format("LL")} [${moment(
        //         message.guild.createdTimestamp
        //     ).fromNow()}]`,
        //     "\u200b",
        // ])
        // .addField("Statistics", [
        //     `**Role Count:** ${roles.length}`,
        //     `**Emoji Count:** ${emojis.size}`,
        //     `**Regular Emoji Count:** ${
        //         emojis.filter((emoji) => !emoji.animated).size
        //     }`,
        //     `**Animated Emoji Count:** ${
        //         emojis.filter((emoji) => emoji.animated).size
        //     }`,
        //     `**Member Count:** ${message.guild.memberCount}`,
        //     `**Humans:** ${members.filter((member) => !member.user.bot).size}`,
        //     `**Bots:** ${members.filter((member) => member.user.bot).size}`,
        //     `**Text Channels:** ${
        //         channels.filter((channel) => channel.type === "text").size
        //     }`,
        //     `**Voice Channels:** ${
        //         channels.filter((channel) => channel.type === "voice").size
        //     }`,
        //     `**Boost Count:** ${message.guild.premiumSubscriptionCount || "0"}`,
        //     "\u200b",
        // ])
        // .addField("Presence", [
        //     `**Online:** ${
        //         members.filter((member) => member.presence.status === "online")
        //             .size
        //     }`,
        //     `**Idle:** ${
        //         members.filter((member) => member.presence.status === "idle")
        //             .size
        //     }`,
        //     `**Do Not Disturb:** ${
        //         members.filter((member) => member.presence.status === "dnd")
        //             .size
        //     }`,
        //     `**Offline:** ${
        //         members.filter((member) => member.presence.status === "offline")
        //             .size
        //     }`,
        //     "\u200b",
        // ])
        // .addField(`Roles [${roles.length - 1}]`, roles.join(", "))

        .setTimestamp();

    message.reply({ embeds: [embed] });
};

module.exports = serverinfo;
