import { Confirmation, Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	ApplicationCommandOptionType,
	EmbedBuilder,
	GuildMember,
	PermissionsBitField,
} from "discord.js";

export default new Command({
	category: "Moderation",
	type: CommandType.ChatInput,
	description: "Kick a user.",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "The user to kick",
			required: true,
		},
		{
			name: "reason",
			type: ApplicationCommandOptionType.String,
			description: "The reason to kick this user",
		},
	],
	async commandRun(interaction) {
		const target = await interaction.guild?.members.fetch(
			(interaction.options.getMember("user") as GuildMember).id,
		);
		const kickReason =
			interaction.options.getString("reason") || "No reason provided.";

		if (
			!(interaction.member as GuildMember).permissions.has([
				PermissionsBitField.Flags.KickMembers,
			])
		)
			return interaction.reply({
				content:
					"You do not have the sufficient permission `KickMembers` to use this command!",
				ephemeral: true,
			});

		if (interaction.user.id === target?.id)
			return interaction.reply({
				content: "You can't kick yourself dumb dumb!",
				ephemeral: true,
			});

		if (target?.id === interaction.client.user.id)
			return interaction.reply({
				content: "I can't kick myself dumbass!",
				ephemeral: true,
			});

		if (target?.permissions.has([PermissionsBitField.Flags.Administrator]))
			return interaction.reply({
				content: "I can't kick an administrator!",
				ephemeral: true,
			});

		const targetPosition = target?.roles.highest.position;
		const authorPosition = (interaction.member as GuildMember).roles.highest
			.position;
		const botPosition = (interaction.guild?.members.me as GuildMember).roles
			.highest.position;

		if (authorPosition <= targetPosition!)
			return interaction.reply({
				content: `You can't kick ${target?.user.username}! This user's position is higher or equal to yours.`,
				ephemeral: true,
			});

		if (botPosition <= targetPosition!)
			return interaction.reply({
				content: `I can't kick ${target?.user.username}! This user's position is higher or equal to mine.`,
				ephemeral: true,
			});

		const confirmationEmbed = new EmbedBuilder()
			.setTitle("Are you sure?")
			.setColor("Red")
			.setDescription("Do you really want to kick this user?")
			.setFooter({
				text: "Confirmation...",
				iconURL: `${interaction.client.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setAuthor({
				iconURL: interaction.user.displayAvatarURL({ forceStatic: true }),
				name: `${interaction.user.username}#${interaction.user.tag}`,
			});

		const userKicked = new EmbedBuilder()
			.setTitle("A user has been kicked! 🦵")
			.setColor("Red")
			.setDescription(
				`${target?.user.tag} has been kicked from ${interaction.guild?.name}!`,
			)
			.addFields(
				{
					name: "Moderator:",
					value: `${interaction.user.tag} (${interaction.user.id})`,
				},
				{
					name: "Target Details:",
					value: `${target?.user.tag} (${target?.user.id})`,
					inline: true,
				},
				{
					name: "Reason:",
					value: `${kickReason}`,
					inline: true,
				},
				{
					name: "Time of Kick:",
					value: `<t:${Math.round(new Date().getTime() / 1000)}:F>`,
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
				iconURL: `${interaction.client.user?.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setAuthor({
				name: `${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({ forceStatic: true })}`,
			})
			.setThumbnail(`${interaction.guild?.iconURL({ forceStatic: true })}`);
		new Confirmation({
			context: interaction,
			redBtnText: "No",
			greenBtnText: "Yes",
			onConfirm: async (int) => {
				int.reply({ embeds: [userKicked] });
				return target?.kick(kickReason);
			},
			onDecline: (int) => {
				int.reply({
					embeds: [
						new EmbedBuilder({
							title: `Kicking user ${target?.user.tag} cancelled.`,
							author: {
								name: `${interaction.user.tag}`,
								iconURL: `${interaction.user.displayAvatarURL({
									forceStatic: true,
								})}`,
							},
							description: "No one has been kicked, Yay",
							color: 0xe91e63,
							footer: {
								text: `${interaction.guild?.name}`,
								iconURL: `${interaction.guild?.iconURL({ forceStatic: true })}`,
							},
						}),
					],
					ephemeral: true,
				});
			},
		}).reply({ embeds: [confirmationEmbed], ephemeral: true });
	},
});
