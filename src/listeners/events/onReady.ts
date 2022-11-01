import { Listener } from "#lib/structures";
import { ActivityType, EmbedBuilder, TextChannel } from "discord.js";
import "dotenv/config";

export default new Listener({
	event: "ready",
	async run(client) {
		const totalUsers = client.guilds.cache.reduce(
			(acc, guild) => acc + guild.memberCount,
			0,
		);

		client.user!.setActivity("his sweet voice<3", {
			type: ActivityType.Listening,
		});
		setInterval(() => {
			let activities = [
				"Ash's adorable voice",
				`${client.guilds.cache.size} server(s)`,
				`${totalUsers} user(s)`,
				"Ash's deceiving voice<3",
			];
			// Sets The Activity:

			const randomIndex = Math.floor(
				Math.random() * (activities.length - 1) + 1,
			);

			client.user!.setActivity(activities[randomIndex], {
				type: ActivityType.Listening,
			});
		}, 600000);
		// Sends a Startup Embed to a Channel:
		const globalCommands = client.commands.filter(
			(c) => Boolean(c.commandRun) && !c.guildIds.length,
		);
		const startUpEmbed = new EmbedBuilder()
			.setTitle(`Logged in as ${client.user.tag}!`)
			.addFields(
				{
					name: "Server(s)",
					value: `**${client.guilds.cache.size}**`,
					inline: true,
				},
				{
					name: "User(s)",
					value: `**${totalUsers}**`,
					inline: true,
				},
				{
					name: "Command(s)",
					value: `**${globalCommands.size}** Total Commands`,
					inline: true,
				},
			)
			.setTimestamp()
			.setColor(0xbf40bf)
			.setImage(
				"https://secure.static.tumblr.com/b201197f740539e2fc03fed7dbf87f3a/bkjzmrk/VVBnz6bja/tumblr_static_tumblr_static_eilga746g9sk88scs040cosws_640.gif",
			)
			.setThumbnail(client.user.displayAvatarURL({ forceStatic: true }));

		// Finding the Channel to send the Embed:
		const channel = client.channels.cache.find(
			(ch) => ch.id === process.env.CHANNEL_ID,
		);
		if (!channel)
			client.logger.error("Invalid `CHANNEL_ID` specified in `.env`");

		if (channel!.isTextBased()) {
			// Sending the Embed:

			(<TextChannel>channel).send({ embeds: [startUpEmbed] });
		}

		const guildNames = client.guilds.cache.map((g) => g.name);

		client.logger.info(`Guilds:`, `${guildNames.join(", ")}`);
	},
});
