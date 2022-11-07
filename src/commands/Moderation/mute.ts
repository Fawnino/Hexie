import { Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	GuildMember,
	DateResolvable,
	PermissionsBitField,
} from "discord.js";

export default new Command({
	type: CommandType.ChatInput,
	description: "Disable a users communication.",
	category: "Moderation",
	options: [
		{
			name: "target",
			description: "The user you want to mute.",
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: "duration",
			description: "The time that you want to mute the user for",
			minValue: 1,
			max_value: 1209600000,
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
		{
			name: "unit",
			description: "The unit of time that you want to mute the user for",
			type: ApplicationCommandOptionType.String,
			choices: [
				{
					name: "Seconds",
					value: "s",
				},
				{
					name: "Minutes",
					value: "m",
				},
				{
					name: "Hours",
					value: "h",
				},
				{
					name: "Days",
					value: "d",
				},
			],
			required: true,
		},
		{
			name: "reason",
			description: "The reason for the mute",
			type: ApplicationCommandOptionType.String,
		},
	],
	async commandRun(interaction) {
		const targetMember = interaction.options.getMember("target") as GuildMember;
		const durationNumber = interaction.options.getInteger("duration", true);
		const durationUnit = interaction.options.getString("unit", true);
		const muteReason =
			interaction.options.getString("reason") || "No reason provided.";

		if (targetMember.id === interaction.user.id)
			return interaction.reply({
				content: `Why would you want to mute yourself?`,
				ephemeral: true,
			});

		if (
			targetMember?.permissions.has([PermissionsBitField.Flags.Administrator])
		)
			return interaction.reply({
				content: "I can't mute an administrator!",
				ephemeral: true,
			});

		if (!targetMember.manageable || !targetMember.moderatable)
			return interaction.reply({
				content:
					"The user that you are trying to mute is higher than I am in the role hierarchy, meaning that I cannot moderate them.",
				ephemeral: true,
			});

		if (
			targetMember.roles.highest.position >
			(interaction.member! as GuildMember).roles.highest.position
		)
			return interaction.reply({
				content:
					"The user that you are trying to mute is higher than you are in the role hierarchy.",
				ephemeral: true,
			});

		if (
			!(targetMember as GuildMember).permissions.has([
				PermissionsBitField.Flags.ManageMessages,
			])
		)
			return interaction.reply({
				content:
					"You do not have the sufficient permission `ManageMessages` to use this command!",
				ephemeral: true,
			});

		let muteDuration: number;

		if (durationUnit === "s") muteDuration = 1000 * durationNumber;
		else if (durationUnit === "m") muteDuration = 1000 * 60 * durationNumber;
		else if (durationUnit === "h")
			muteDuration = 1000 * 60 * 60 * durationNumber;
		else if (durationUnit === "d")
			muteDuration = 1000 * 60 * 60 * 24 * durationNumber;
		else muteDuration = durationNumber;

		if (targetMember.isCommunicationDisabled()) {
			const targetMutedUntil =
				targetMember.communicationDisabledUntil?.getTime() -
				new Date().getTime();
			muteDuration += targetMutedUntil;
		}

		const targetMuted = new EmbedBuilder()
			.setTitle("Muted!")
			.setThumbnail(`${targetMember.displayAvatarURL({ forceStatic: true })}`)
			.setColor("Green")
			.setDescription(`${targetMember.user.username} has been muted`)
			.addFields(
				{
					name: "Moderator",
					value: `${interaction.user}`,
					inline: true,
				},
				{
					name: "Target",
					value: `${targetMember.user}`,
					inline: true,
				},
				{
					name: "Reason",
					value: `${muteReason}`,
					inline: true,
				},
				{
					name: "\u200b",
					value: "\u200b",
					inline: true,
				},
				{
					name: "\u200b",
					value: "\u200b",
					inline: true,
				},
			)
			.setFooter({
				text: `${interaction.guild?.name}`,
				iconURL: interaction.guild?.iconURL() as string,
			})
			.setTimestamp();

		let dateMuteDuration: DateResolvable;

		if (!interaction.deferred) await interaction.deferReply();

		dateMuteDuration = new Date(Date.now() + muteDuration);

		await targetMember.disableCommunicationUntil(dateMuteDuration, muteReason);

		return interaction.followUp({
			embeds: [targetMuted],
		});
	},
});
