import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	ApplicationCommandOptionType,
	ChannelType,
	EmbedBuilder,
	GuildMember,
	PermissionsBitField,
	TextChannel,
} from "discord.js";

export default new CelestineCommand({
	category: "Moderation",
	type: CommandType.ChatInput,
	description: "Set the chat delay for the channel!",
	options: [
		{
			name: "slowmode",
			description: "Slow mode setting",
			type: ApplicationCommandOptionType.String,
			choices: [
				{
					name: "off",
					value: "0",
				},
				{
					name: "5s",
					value: "5",
				},
				{
					name: "10s",
					value: "10",
				},
				{
					name: "15s",
					value: "15",
				},
				{
					name: "30s",
					value: "30",
				},
				{
					name: "1m",
					value: "60",
				},
				{
					name: "2m",
					value: "120",
				},
				{
					name: "5m",
					value: "300",
				},
				{
					name: "10m",
					value: "600",
				},
				{
					name: "15m",
					value: "900",
				},
				{
					name: "30m",
					value: "1800",
				},
				{
					name: "1h",
					value: "3600",
				},
				{
					name: "2h",
					value: "7200",
				},
				{
					name: "6h",
					value: "21600",
				},
			],
			required: true,
		},
		{
			name: "channel",
			description: "The channel that you want to enable slowmode on",
			type: ApplicationCommandOptionType.Channel,
			channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
			required: false,
		},
	],
	async commandRun(interaction) {
		const targetChannel =
			(interaction.options.getChannel("channel") as TextChannel) ||
			(interaction.channel as TextChannel);
		const slowmodeSetting = interaction.options.getString("slowmode", true);

		if (
			!(interaction.member as GuildMember).permissions.has([
				PermissionsBitField.Flags.ManageMessages,
			])
		)
			return interaction.reply({
				content:
					"You do not have the sufficient permission `ManageMessages` to use this command!",
				ephemeral: true,
			});

		const SuccessEmbed = new EmbedBuilder()
			.setTitle(`✔️ Success!`)
			.setColor("Green")
			.setFooter({
				text: `Requested by ${interaction.user.username}`,
				iconURL: interaction.user.displayAvatarURL(),
			});
		//If the user chose 0 seconds, we disable the slowmode
		if (slowmodeSetting === "0") {
			SuccessEmbed.setDescription(`Disabled slowmode in ${targetChannel}`);
			await targetChannel.setRateLimitPerUser(0);
			return interaction.reply({
				embeds: [SuccessEmbed],
			});
		}

		const slowmodeDuration = Number(slowmodeSetting);
		//Optional, but I like it like this, you can also use a function for this but too lazy to create one for little options
		//Function:

		let humanReadableTime;
		if (slowmodeDuration === 5) humanReadableTime = "5 seconds";
		if (slowmodeDuration === 10) humanReadableTime = "10 seconds";
		if (slowmodeDuration === 15) humanReadableTime = "15 seconds";
		if (slowmodeDuration === 30) humanReadableTime = "30 seconds";
		if (slowmodeDuration === 60) humanReadableTime = "1 minute";
		if (slowmodeDuration === 120) humanReadableTime = "2 minutes";
		if (slowmodeDuration === 300) humanReadableTime = "5 minutes";
		if (slowmodeDuration === 600) humanReadableTime = "10 minutes";
		if (slowmodeDuration === 900) humanReadableTime = "15 minutes";
		if (slowmodeDuration === 1800) humanReadableTime = "30 minutes";
		if (slowmodeDuration === 3600) humanReadableTime = "1 hour";
		if (slowmodeDuration === 7200) humanReadableTime = "2 hours";
		if (slowmodeDuration === 21600) humanReadableTime = "6 hours";

		try {
			//Setting the slowmode
			await targetChannel.setRateLimitPerUser(slowmodeDuration);

			SuccessEmbed.setDescription(
				`Slowmode in ${targetChannel} has been set to ${humanReadableTime}`,
			);
			await interaction.reply({
				embeds: [SuccessEmbed],
			});
		} catch (error) {
			//If an error occured
			interaction.client.logger.error(`${error}`);

			return interaction.reply({
				content: "There was an issue while processing this interaction!",
				ephemeral: true,
			});
		}
	},
});
