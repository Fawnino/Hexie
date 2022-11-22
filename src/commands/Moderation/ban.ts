import { Confirmation, CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	ApplicationCommandOptionType,
	EmbedBuilder,
	GuildMember,
	PermissionsBitField,
} from "discord.js";

export default new CelestineCommand({
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
	async messageRun(message, args) {
		const member =
			message.mentions.members?.first() ||
			message.guild?.members.cache.get(args[0]);

		const banReason = args.slice(1).join(" ") || "No reason provided.";

		if (
			!(message.member as GuildMember).permissions.has([
				PermissionsBitField.Flags.BanMembers,
			])
		)
			return message.reply({
				content:
					"You do not have the sufficient permission `BanMembers` to use this command!",
			});

		if (!member)
			return message.reply({
				content: "Please specify a user to ban!",
			});

		if (message.author.id === member.id)
			return message.reply({
				content: "You can't ban yourself dumb dumb!",
			});

		if (member.id === message.client.user.id)
			return message.reply({
				content: "I can't ban myself dumbass!",
			});

		if (member?.permissions.has([PermissionsBitField.Flags.Administrator]))
			return message.reply({
				content: "I can't ban an administrator!",
			});

		const targetPosition = member?.roles.highest.position;
		const authorPosition = (message.member as GuildMember).roles.highest
			.position;
		const botPosition = (message.guild?.members.me as GuildMember).roles.highest
			.position;

		if (authorPosition <= targetPosition!)
			return message.reply({
				content: `You can't ban ${member.user.username}! This user's position is higher or equal to yours.`,
			});

		if (botPosition <= targetPosition!)
			return message.reply({
				content: `I can't ban ${message.author.username}! This user's position is higher or equal to mine.`,
			});

		const confirmationEmbed = new EmbedBuilder()
			.setTitle("Are you sure?")
			.setColor("Red")
			.setDescription("Do you really want to ban this user?")
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
			.setTitle("A user has been banned! 🔨")
			.setColor("Red")
			.setDescription(
				`${member.user.tag} has been banned from ${message.guild?.name}!`,
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

				return member?.ban({ reason: `${banReason}` });
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
							description: "No one has been banned, Yay",
							color: 0xe91e63,
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
