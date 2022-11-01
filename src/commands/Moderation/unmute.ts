import { Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	GuildMember,
	PermissionsBitField,
} from "discord.js";

export default new Command({
	type: CommandType.ChatInput,
	description: "Unmute a muted user.",
	category: "Moderation",
	options: [
		{
			name: "user",
			description: "The user you want to unmute",
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: "reason",
			description: "The reason for the unmute",
			type: ApplicationCommandOptionType.String,
		},
	],
	async commandRun(interaction) {
		const targetUser = interaction.options.getUser("user", true);
		const unmuteReason =
			interaction.options.getString("reason") || "No reason provided.";

		const targetMember = interaction.guild?.members.cache.get(
			targetUser.id,
		) as GuildMember;

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

		if (!targetMember)
			return interaction.reply({
				content: `The user provided is not in ${interaction.guild?.name}`,
				ephemeral: true,
			});

		if (targetMember.id === interaction.user.id)
			return interaction.reply({
				content: `You can't unmute yourself lmao.`,
				ephemeral: true,
			});

		if (!targetMember.isCommunicationDisabled())
			return interaction.reply({
				content: "The user you're trying to mute is not muted!",
				ephemeral: true,
			});

		if (!targetMember.manageable || !targetMember.moderatable)
			return interaction.reply({
				content:
					"The user that you are trying to unmute is higher than I am in the role hierarchy, meaning that I cannot moderate them.",
				ephemeral: true,
			});
		if (
			targetMember.roles.highest.position >
			(interaction.member! as GuildMember).roles.highest.position
		)
			return interaction.reply({
				content:
					"The user that you are trying to unmute is higher than you are in the role hierarchy.",
				ephemeral: true,
			});

		const successUnmute = new EmbedBuilder()
			.setTitle("Success!")
			.setColor("Green")
			.setDescription(
				`**Successfully unmuted:** ${targetMember}\n**Unmute reason:** ${unmuteReason}`,
			)
			.setFooter({
				text: `${interaction.guild?.name}`,
				iconURL: interaction.guild?.iconURL() as string,
			})
			.setThumbnail(`${targetMember.displayAvatarURL({ forceStatic: true })}`)
			.setTimestamp();

		if (!interaction.deferred) await interaction.deferReply();

		await targetMember.disableCommunicationUntil(null, unmuteReason);

		return interaction.followUp({
			embeds: [successUnmute],
		});
	},
});
