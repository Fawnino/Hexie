import { Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	PermissionsBitField,
	EmbedBuilder,
	ApplicationCommandOptionType,
	GuildMember,
	Role,
} from "discord.js";

export default new Command({
	type: CommandType.ChatInput,
	description: "Configure roles!",
	category: "Moderation",
	options: [
		{
			name: "add",
			description: "Add a role to a user",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "target",
					description: "User to add the role to.",
					required: true,
					type: ApplicationCommandOptionType.User,
				},
				{
					name: "role",
					description: "Role to add the user to.",
					required: true,
					type: ApplicationCommandOptionType.Role,
				},
			],
		},
		{
			name: "remove",
			description: "Remove a role from a user",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "target",
					description: "User to remove the role from.",
					required: true,
					type: ApplicationCommandOptionType.User,
				},
				{
					name: "role",
					description: "Role to remove the user from.",
					required: true,
					type: ApplicationCommandOptionType.Role,
				},
			],
		},
	],
	async commandRun(interaction) {
		const Types = interaction.options.getSubcommand();
		const role2 = interaction.options.getRole("role", true) as Role;
		const member = interaction.options.getMember("target") as GuildMember;

		if (
			!(member as GuildMember).permissions.has([
				PermissionsBitField.Flags.ManageRoles,
			])
		)
			return interaction.reply({
				content:
					"You do not have the sufficient permission `ManageRoles` to use this command!",
			});

		if (!member.manageable || !member.moderatable)
			return interaction.reply({
				content:
					"The user that you are trying to configure a role to is higher than I am in the role hierarchy, meaning that I cannot moderate them.",
				ephemeral: true,
			});

		switch (Types) {
			case "add": {
				if (member.roles.cache.some((role) => role.id === role2.id))
					return interaction.reply({
						content:
							"This user already has this role! Try again and give them a different role.",
						ephemeral: true,
					});

				const successEmbed = new EmbedBuilder()
					.setTitle("Added a Role!")
					.setThumbnail(`${member.displayAvatarURL({ forceStatic: true })}`)
					.addFields(
						{
							name: "Moderator",
							value: `${interaction.user.tag}`,
							inline: true,
						},
						{
							name: "Role Added",
							value: `${member} had ${role2} added to them.`,
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
					.setColor("Green")
					.setTimestamp()
					.setFooter({
						text: `Requested By: ${interaction.guild!.name}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				member.roles.add(role2);
				return interaction.reply({
					embeds: [successEmbed],
					allowedMentions: { repliedUser: false },
				});
			}
			case "remove": {
				if (!member.roles.cache.some((role) => role.id === role2.id))
					return interaction.reply({
						content:
							"This user does not has this role! Try again and remove a different role from them.",
						ephemeral: true,
					});

				const successEmbed = new EmbedBuilder()
					.setTitle("Removed a Role!")
					.setThumbnail(`${member.displayAvatarURL({ forceStatic: true })}`)
					.addFields(
						{
							name: "Moderator",
							value: `${interaction.user.tag}`,
							inline: true,
						},
						{
							name: "Role Taken Off",
							value: `${member} had ${role2} taken off them.`,
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
					.setTimestamp()
					.setColor("Green")
					.setFooter({
						text: `Requested By: ${interaction.guild!.name}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				member.roles.remove(role2);
				return interaction.reply({
					embeds: [successEmbed],
					allowedMentions: { repliedUser: false },
				});
			}
		}
	},
});
