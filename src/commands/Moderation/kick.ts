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
	async messageRun(message, args) {
		const member =
			message.mentions.members?.first() ||
			message.guild?.members.cache.get(args[0]);

		const kickReason = args.slice(1).join(" ") || "No reason provided.";

		if (
			!(message.member as GuildMember).permissions.has([
				PermissionsBitField.Flags.KickMembers,
			])
		)
			return message.reply({
				content:
					"You do not have the sufficient permission `BanMembers` to use this command!",
			});

		if (!member)
			return message.reply({
				content: "Please specify a user to kick!",
			});

		if (message.author.id === member.id)
			return message.reply({
				content: "You can't kick yourself dumb dumb!",
			});

		if (member.id === message.client.user.id)
			return message.reply({
				content: "I can't kick myself dumbass!",
			});

		if (member?.permissions.has([PermissionsBitField.Flags.Administrator]))
			return message.reply({
				content: "I can't kick an administrator!",
			});

		const targetPosition = member?.roles.highest.position;
		const authorPosition = (message.member as GuildMember).roles.highest
			.position;
		const botPosition = (message.guild?.members.me as GuildMember).roles.highest
			.position;

		if (authorPosition <= targetPosition!)
			return message.reply({
				content: `You can't kick ${member.user.username}! This user's position is higher or equal to yours.`,
			});

		if (botPosition <= targetPosition!)
			return message.reply({
				content: `I can't kick ${message.author.username}! This user's position is higher or equal to mine.`,
			});

		const confirmationEmbed = new EmbedBuilder()
			.setTitle("Are you sure?")
			.setColor("Red")
			.setDescription("Do you really want to kick this user?")
			.setFooter({
				text: "Confirmation...",
				iconURL: `${message.client.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setAuthor({
				iconURL: message.author.displayAvatarURL({ forceStatic: true }),
				name: `${message.author.tag}`,
			});

		const userBanned = new EmbedBuilder()
			.setTitle("A user has been kicked! 🦵")
			.setColor("Red")
			.setDescription(
				`${member.user.tag} has been kicked from ${message.guild?.name}!`,
			)
			.addFields(
				{
					name: "Moderator:",
					value: `${message.author.tag} (${message.author.id})`,
					inline: true,
				},
				{
					name: "Target Details:",
					value: `${member.user.tag} (${member.user.id})`,
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
				text: `${message.guild?.name}`,
				iconURL: `${message.client.user?.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setAuthor({
				name: `${message.author.tag}`,
				iconURL: `${message.author.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setThumbnail(`${message.guild?.iconURL({ forceStatic: true })}`);
		new Confirmation({
			context: message,
			redBtnText: "No",
			greenBtnText: "Yes",
			onConfirm: (msg) => {
				msg.reply({ embeds: [userBanned] });

				return member?.kick(kickReason);
			},
			onDecline: (msg) => {
				msg.reply({
					embeds: [
						new EmbedBuilder({
							title: `Banning user ${member.user.tag} cancelled.`,
							author: {
								name: `${message.author.tag}`,
								iconURL: `${message.author.displayAvatarURL({
									forceStatic: true,
								})}`,
							},
							description: "No one has been kicked, Yay",
							color: 0xfde4f2,
							footer: {
								text: `${message.guild?.name}`,
								iconURL: `${message.guild?.iconURL({ forceStatic: true })}`,
							},
						}),
					],
					ephemeral: true,
				});
			},
		}).reply({ embeds: [confirmationEmbed], ephemeral: true });
	},
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
