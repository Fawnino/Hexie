import { Confirmation, HexieCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	ApplicationCommandOptionType,
	EmbedBuilder,
	GuildMember,
	PermissionsBitField,
} from "discord.js";

export default new HexieCommand({
	category: "Moderation",
	type: CommandType.ChatInput,
	description: "Ban a user.",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "User to ban from the guild.",
			required: true,
		},
		{
			name: "reason",
			description: "Reason why you're banning this user.",
			type: ApplicationCommandOptionType.String,
		},
	],
	async commandRun(interaction) {
		const target = interaction.options.getMember("user") as GuildMember;
		const banReason =
			interaction.options.getString("reason") || "No reason provided.";

		const ServerMember = interaction.guild?.members.cache.get(target.id);

		const fetchBans = await interaction.guild?.bans.fetch();
		if (fetchBans) {
			const bannedUser = fetchBans.get(target.id);
			if (bannedUser)
				return interaction.reply({
					content: "This user is already banned! Ban someone who isn't banned.",
					ephemeral: true,
				});
		}

		if (
			!(interaction.member as GuildMember).permissions.has([
				PermissionsBitField.Flags.BanMembers,
			])
		)
			return interaction.reply({
				content:
					"You do not have the sufficient permission `BanMembers` to use this command!",
				ephemeral: true,
			});

		if (interaction.user.id === target.id)
			return interaction.reply({
				content: "You can't ban yourself dumb dumb!",
				ephemeral: true,
			});

		if (target.id === interaction.client.user.id)
			return interaction.reply({
				content: "I can't ban myself dumbass!",
				ephemeral: true,
			});

		if (
			ServerMember?.permissions.has([PermissionsBitField.Flags.Administrator])
		)
			return interaction.reply({
				content: "I can't ban an administrator!",
				ephemeral: true,
			});

		const targetPosition = target?.roles.highest.position;
		const authorPosition = (interaction.member as GuildMember).roles.highest
			.position;
		const botPosition = (interaction.guild?.members.me as GuildMember).roles
			.highest.position;

		if (authorPosition <= targetPosition!)
			return interaction.reply({
				content: `You can't ban ${target.user.username}! This user's position is higher or equal to yours.`,
				ephemeral: true,
			});

		if (botPosition <= targetPosition!)
			return interaction.reply({
				content: `I can't ban ${target.user.username}! This user's position is higher or equal to mine.`,
				ephemeral: true,
			});

		const confirmationEmbed = new EmbedBuilder()
			.setTitle("Are you sure?")
			.setColor("Red")
			.setDescription("Do you really want to ban this user?")
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

		const userBanned = new EmbedBuilder()
			.setTitle("A user has been banned! 🔨")
			.setColor("Red")
			.setDescription(
				`${target.user.tag} has been banned from ${interaction.guild?.name}!`,
			)
			.addFields(
				{
					name: "Moderator:",
					value: `${interaction.user.tag} (${interaction.user.id})`,
					inline: true,
				},
				{
					name: "Target Details:",
					value: `${target.user.tag} (${target.user.id})`,
					inline: true,
				},
				{
					name: "Reason:",
					value: `${banReason}`,
					inline: true,
				},
				{
					name: "Time of Ban:",
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
				iconURL: `${interaction.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setThumbnail(`${interaction.guild?.iconURL({ forceStatic: true })}`);
		new Confirmation({
			context: interaction,
			redBtnText: "No",
			greenBtnText: "Yes",
			onConfirm: (int) => {
				int.reply({ embeds: [userBanned] });

				return target?.ban({ reason: `${banReason}` });
			},
			onDecline: (int) => {
				int.reply({
					embeds: [
						new EmbedBuilder({
							title: `Banning user ${target.user.tag} cancelled.`,
							author: {
								name: `${interaction.user.tag}`,
								iconURL: `${interaction.user.displayAvatarURL({
									forceStatic: true,
								})}`,
							},
							description: "No one has been banned, Yay",
							color: 0xfde4f2,
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
