const { joinVoiceChannel } = require("@discordjs/voice");

const join = async (message) => {
	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel) return await message.reply("You need to be in a voice channel to use this command!");

	try {
		joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});

		return await message.reply(`Bot has been joined to ${voiceChannel.name}`);
	} catch (error) {
		console.error(error);
		return await message.reply("There was an error joining the voice channel!");
	}
};

module.exports = join;
