const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	NoSubscriberBehavior,
	AudioPlayerStatus,
} = require('@discordjs/voice');
const ytsearch = require('yt-search');
const playdl = require('play-dl');

const play = async (message) => {
	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel) {
		return message.reply('You need to be in a voice channel to use this command!');
	}

	const songName = message.options.getString("songtitle")
	if (!songName) {
		return message.reply('Please provide a song name!');
	}

	try {
		// Join voice channel
		const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});

		// Searching video
		const videoFinder = async (query) => {
			const videoResult = await ytsearch(query);
			return videoResult.videos.length > 0 ? videoResult.videos[0] : null;
		};

		const video = await videoFinder(songName);
		if (video) {
			try {
				// Fetch the stream using play-dl
				const stream = await playdl.stream(video.url);
				
				const resource = createAudioResource(stream.stream, {
					inputType: stream.type,
					inlineVolume: true,
				});
				resource.volume.setVolume(0.5);

				const player = createAudioPlayer({
					behaviors: {
						noSubscriber: NoSubscriberBehavior.Play,
					},
				});

				player.play(resource, { highWaterMark: 1024 * 1024 * 10 });
				connection.subscribe(player);

				player.on(AudioPlayerStatus.Playing, () => {
					console.log('The player is currently playing.');
					message.channel.send(`Now Playing: ${video.title}`);
				});

				player.on(AudioPlayerStatus.Paused, () => {
					console.log('The player is currently paused.');
				});

				player.on(AudioPlayerStatus.Idle, () => {
					console.log('The player is idle.');
					connection.destroy();
				});

				player.on(AudioPlayerStatus.AutoPaused, () => {
					console.log('The player is auto-paused.');
				});

				player.on(AudioPlayerStatus.Buffering, () => {
					console.log('The player is buffering.');
				});

				player.on('error', (error) => {
					console.error('Player error:', error);
					message.channel.send('An error occurred while playing the song.');
					connection.destroy();
				});

				setInterval(() => {
					const currentStatus = player.state.status;
					console.log(`Current player status: ${currentStatus}`);
				}, 5000)
			} catch (streamError) {
				console.error('Error creating stream:', streamError);
				message.reply('Error creating audio stream. Please try again.');
			}
		} else {
			return message.reply('No video results found.');
		}
	} catch (error) {
		console.error('Error:', error);
		message.reply('Error playing the song!');
	}
};

module.exports = play;
