import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	GuildExplicitContentFilter, //Oh also can you add `category: '<parent-folder-name>'` to each command
	GuildVerificationLevel,
	ChannelType,
	ButtonStyle,
	ButtonBuilder,
	ActionRowBuilder,
} from "discord.js";
import moment from "moment";
import os from "node:os";
import canvas from "canvas";
import { QuickDB } from "quick.db";

const db = new QuickDB();

export default new CelestineCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Information commands!",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Get information about a user.",
			options: [
				{
					name: "target",
					description: "User to get information about.",
					type: ApplicationCommandOptionType.User,
					required: false,
				},
			],
		},
		{
			name: "server",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Get information about a server.",
		},
		{
			name: "bot",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Get information about the bot.",
		},
		{
			name: "worldclock",
			description: "Get information about all timezones!",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "levels",
			description: "Get a user's level.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "user",
					description: "The user you want to get the level of.",
					type: ApplicationCommandOptionType.User,
				},
			],
		},
		{
			name: "yeardata",
			description: "Displays the year so far!",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "links",
			description: "Get all the links for the bot!",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "ping",
			description: "Ping Pong!",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "avatar",
			description: "Get a user's avatar!",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "target",
					description: "User to get their avatar.",
					type: ApplicationCommandOptionType.User,
				},
			],
		},
		{
			name: "cel-tos",
			description: "Get the terms of service for Celestine!",
			type: ApplicationCommandOptionType.Subcommand,
		},
	],
	async messageRun(message, args) {
		const targetMember =
			(await message.mentions.users?.first()?.fetch(true)) ||
			(await message.author?.fetch(true));

		const totalUsers = message.client.guilds.cache.reduce(
			(acc, guild) => acc + guild.memberCount,
			0,
		);

		const noArgsProvided = new EmbedBuilder()
			.setTitle("Information Arguments:")
			.addFields(
				{
					name: ":info user",
					value: `Get a user's information.`,
					inline: true,
				},
				{
					name: ":info server",
					value: `Get the server's information.`,
					inline: true,
				},
				{
					name: ":info avatar",
					value: `Get a user's avatar.`,
					inline: true,
				},
				{
					name: ":info bot",
					value: `Get the client's information.`,
					inline: true,
				},
				{
					name: ":info worldclock",
					value: `Get information about all timezones.`,
					inline: true,
				},
				{
					name: ":info levels",
					value: `Get the user's level information.`,
					inline: true,
				},
				{
					name: ":info yeardata",
					value: `Displays the year so far.`,
					inline: true,
				},
				{
					name: ":info links",
					value: `Get all the links for the bot.`,
					inline: true,
				},
				{
					name: ":info ping",
					value: `Ping Pong!`,
					inline: true,
				},
				{
					name: ":info cel-tos",
					value: `Get the TOS for the client.`,
					inline: true,
				},
			)
			.setColor("LuminousVividPink")
			.setFooter({
				text: `Requested by: ${message.author.tag}`,
				iconURL: `${message.author.displayAvatarURL({ forceStatic: true })}`,
			});

		if (!args[0]) return message.reply({ embeds: [noArgsProvided] });

		if (args[0] === "server") {
			const titleCase = (
				str: GuildExplicitContentFilter | GuildVerificationLevel,
			) => {
				return String(str)
					.toLowerCase()
					.replace(/_/g, " ")
					.split(" ")
					.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
					.join(" ");
			};

			const ServerInformationEmbed = new EmbedBuilder()
				.setTitle(`${message.guild!.name}`)
				.setAuthor({
					name: `${message.author.tag}`,
					iconURL: `${message.author.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setThumbnail(
					message.guild!.iconURL({
						forceStatic: true,
					}) ?? "https://i.imgur.com/AWGDmiu.png",
				)
				.setDescription(
					`${message.guild!.name} was created on ${`<t:${Math.round(
						new Date(message.guild!.createdTimestamp).valueOf() / 1000,
					)}:F>`}`,
				)
				.setColor("Random")
				.addFields(
					{
						name: "Total Members",
						value: `${message.guild!.memberCount}`,
						inline: true,
					},
					{
						name: "Total Humans",
						value: `${
							message.guild!.members.cache.filter((member) => !member.user.bot)
								.size
						}`,
						inline: true,
					},
					{
						name: "Total Bots",
						value: `${
							message.guild!.members.cache.filter((member) => member.user.bot)
								.size
						}`,
						inline: true,
					},
					{
						name: "Categories",
						value: `${
							message.guild!.channels.cache.filter(
								(c) => c.type === ChannelType.GuildCategory,
							).size
						}`,
						inline: true,
					},
					{
						name: "Text Channels",
						value: `${
							message.guild!.channels.cache.filter(
								(c) => c.type === ChannelType.GuildText,
							).size
						}`,
						inline: true,
					},
					{
						name: "Voice Channels",
						value: `${
							message.guild!.channels.cache.filter(
								(c) => c.type === ChannelType.GuildVoice,
							).size
						}`,
						inline: true,
					},
					{
						name: "Role Count",
						value: `${message.guild!.roles.cache.size}`,
						inline: true,
					},
					{
						name: "Boosts",
						value: `${message.guild!.premiumSubscriptionCount}`,
						inline: true,
					},
					{
						name: "Boost Tier",
						value: `${[message.guild!.premiumTier]}`,
						inline: true,
					},
					{
						name: "Explicit Content Filter",
						value: `${titleCase(message.guild!.explicitContentFilter)}`,
						inline: true,
					},
					{
						name: "Verification Level",
						value: `${titleCase(message.guild!.verificationLevel)}`,
						inline: true,
					},
					{
						name: "AFK Channel",
						value: `${message.guild!.afkChannel ?? "None"}`,
						inline: true,
					},
					{
						name: "AFK Timeout",
						value: message.guild!.afkChannel
							? `${moment
									.duration(message.guild!.afkTimeout * 1000)
									.asMinutes()} minute(s)`
							: "None",
						inline: true,
					},
					{
						name: "Owner",
						value: `<@${message.guild!.ownerId}>`,
						inline: true,
					},
					{
						name: "Region",
						value: `${message.guild!.preferredLocale}`,
						inline: true,
					},
				)
				.setFooter({
					text: `Server ID: ${message.guild!.id}`,
					iconURL: `${
						message.guild!.iconURL() ?? "https://i.imgur.com/AWGDmiu.png"
					}`,
				});
			if (message.guild!.description) {
				ServerInformationEmbed.addFields({
					name: "Server Description",
					value: `${message.guild!.description ?? "No description"}`,
					inline: true,
				});
			}

			if (message.guild!.bannerURL()) {
				ServerInformationEmbed.addFields({
					name: "Server Banner",
					value: `[Banner URL](${message.guild!.bannerURL()})`,
					inline: true,
				});
			}

			if (message.guild!.features.length > 0) {
				let guildFeatures = ``;
				for (let m = 0; m < message.guild!.features.length; m++) {
					guildFeatures = guildFeatures + `${message.guild!.features[m]}, `;
				}
				ServerInformationEmbed.addFields({
					name: "Server Features",
					value: `${capitalize(guildFeatures)}`,
					inline: false,
				});
			}

			return message.reply({
				embeds: [ServerInformationEmbed],
			});
		}

		if (args[0] === "user") {
			const UserCreated = Math.round(targetMember?.createdTimestamp / 1000);

			const avatarUserButton = new ButtonBuilder()
				.setStyle(ButtonStyle.Link)
				.setLabel(`Public Avatar link`)
				.setURL(
					`${targetMember.displayAvatarURL({
						extension: "png",
						forceStatic: true,
						size: 1024,
					})}`,
				);

			const embed = new EmbedBuilder()
				.setAuthor({
					name: `${targetMember.tag}`,
					iconURL: `${targetMember.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setColor(targetMember.hexAccentColor ?? "#5865f2")
				.addFields(
					{
						name: "Joined Discord:",
						value: `<t:${UserCreated}:F>, <t:${UserCreated}:R>`,
						inline: true,
					},
					{
						name: "Username:",
						value: `${targetMember.username}`,
						inline: true,
					},
					{
						name: "Tag:",
						value: `#${targetMember.discriminator}`,
						inline: true,
					},
					{
						name: "Account Type:",
						value: `${targetMember.bot ? "Bot" : "Human"}`,
						inline: true,
					},
					{
						name: "ID:",
						value: `${targetMember.id}`,
						inline: true,
					},
					{
						name: "Profile URL:",
						value: `[${
							targetMember.tag
						}](${`https://discord.com/users/${targetMember.id}`})`,
						inline: true,
					},
					{
						name: "Avatar URL:",
						value: `[Click on me to get the Avatar URL!](${targetMember.displayAvatarURL(
							{
								forceStatic: true,
								size: 1024,
							},
						)})`,
						inline: false,
					},
					{
						name: "\u200B",
						value: "\u200B",
						inline: true,
					},
				)
				.setImage(
					targetMember.displayAvatarURL({
						extension: "png",
						forceStatic: true,
						size: 1024,
					}),
				)
				.setFooter({
					text: `Requested by ${targetMember.tag}`,
					iconURL: `${targetMember.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setTimestamp();

			const fetchedMember = message.guild!.members.cache.get(targetMember.id);

			const avatarMemberButton = new ButtonBuilder();

			if (
				fetchedMember &&
				targetMember.displayAvatarURL() !== fetchedMember.displayAvatarURL()
			) {
				avatarMemberButton.setStyle(ButtonStyle.Link);
				avatarMemberButton.setLabel(`Server Avatar link`);
				avatarMemberButton.setURL(
					fetchedMember.displayAvatarURL({
						forceStatic: true,
					}),
				);
				embed.setDescription(
					`[Avatar URL](${targetMember.displayAvatarURL({
						forceStatic: true,
						size: 1024,
					})})\n[Server Avatar URL](${fetchedMember.displayAvatarURL({
						forceStatic: true,
						size: 1024,
					})})`,
				);
				embed.setThumbnail(
					fetchedMember.displayAvatarURL({
						forceStatic: true,
					}),
				);
			} else {
				avatarMemberButton.setStyle(ButtonStyle.Link);
				avatarMemberButton.setLabel("Server Avatar");
				avatarMemberButton.setDisabled(true);
				avatarMemberButton.setURL(
					`https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`,
				);
			}

			const buttonRows = new ActionRowBuilder<ButtonBuilder>().addComponents([
				avatarUserButton,
				avatarMemberButton,
			]);
			return message.reply({
				embeds: [embed],
				components: [buttonRows],
			});
		}

		if (args[0] === "bot") {
			const days = Math.floor(message.client.uptime / 86400000);
			const hours = Math.floor(message.client.uptime / 3600000) % 24;
			const minutes = Math.floor(message.client.uptime / 60000) % 60;
			const seconds = Math.floor(message.client.uptime / 1000) % 60;

			const botInfoEmbed = new EmbedBuilder()
				.setTitle(`Client Information`)
				.addFields(
					{
						name: "Uptime",
						value: `**${days}** days, **${hours}** hours, **${minutes}** minutes, and **${seconds}** seconds`,
						inline: false,
					},
					{
						name: "Thread(s)",
						value: `**${os.cpus().length.toString()}**`,
						inline: true,
					},
					{
						name: "CPU",
						value: `**${os.cpus()[0].model}**`,
						inline: true,
					},
					{
						name: "Platform(s)",
						value: `**${process.platform}**`,
						inline: true,
					},
				)
				.setColor(0xe91e63);

			const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setCustomId("users")
					.setStyle(ButtonStyle.Secondary)
					.setLabel(`${totalUsers} User(s)`)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId("servers")
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true)
					.setLabel(`${message.client.guilds.cache.size} Server(s)`),
			);

			return message.reply({
				embeds: [botInfoEmbed],
				components: [buttons],
			});
		}

		if (args[0] === "avatar") {
			const fetchedMember = message.guild!.members.cache.get(targetMember.id);

			const avatarUserButton = new ButtonBuilder()
				.setStyle(ButtonStyle.Link)
				.setLabel(`Public Avatar link`)
				.setURL(
					`${targetMember.displayAvatarURL({
						extension: "png",
						forceStatic: true,
						size: 1024,
					})}`,
				);

			const embed = new EmbedBuilder()
				.setTitle(`${targetMember.tag}'s avatar`)
				.setDescription(
					`[Avatar URL](${targetMember.displayAvatarURL({
						forceStatic: true,
						size: 1024,
					})})`,
				)
				.setColor(targetMember.hexAccentColor ?? "#5865f2")
				.setFooter({
					text: `Requested By: ${targetMember.tag}`,
					iconURL: `${targetMember.displayAvatarURL()}`,
				})
				.setImage(
					targetMember.displayAvatarURL({
						extension: "png",
						forceStatic: true,
						size: 1024,
					}),
				);

			const avatarMemberButton = new ButtonBuilder();

			if (
				fetchedMember &&
				targetMember.displayAvatarURL() !== fetchedMember.displayAvatarURL()
			) {
				avatarMemberButton.setStyle(ButtonStyle.Link);
				avatarMemberButton.setLabel(`Server Avatar link`);
				avatarMemberButton.setURL(
					fetchedMember.displayAvatarURL({
						forceStatic: true,
					}),
				);
				embed.setDescription(
					`[Avatar URL](${targetMember.displayAvatarURL({
						forceStatic: true,
						size: 1024,
					})})\n[Server Avatar URL](${fetchedMember.displayAvatarURL({
						forceStatic: true,
						size: 1024,
					})})`,
				);
				embed.setThumbnail(
					fetchedMember.displayAvatarURL({
						forceStatic: true,
					}),
				);
			} else {
				avatarMemberButton.setStyle(ButtonStyle.Link);
				avatarMemberButton.setLabel("Server Avatar");
				avatarMemberButton.setDisabled(true);
				avatarMemberButton.setURL(
					`https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`,
				);
			}

			const buttonRows = new ActionRowBuilder<ButtonBuilder>().addComponents([
				avatarUserButton,
				avatarMemberButton,
			]);

			return message.reply({
				embeds: [embed],
				components: [buttonRows],
			});
		}

		if (args[0] === "yeardata") {
			let date = message.createdAt;
			let cy = date.getUTCFullYear();
			let notLeap = cy % 4;
			const currentYear = new Date().getFullYear();
			const isLeapYear = (year: number) =>
				year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
			function getProgress(d: Date) {
				let full = 31536000;
				let total = 0;
				if (!notLeap) {
					full += 86400;
					if (d.getUTCMonth() >= 2) total += 86400;
				}
				let monthDays = [
					31,
					isLeapYear(currentYear) ? 29 : 28,
					31,
					30,
					31,
					30,
					31,
					31,
					30,
					31,
					30,
					31,
				];
				total +=
					monthDays.slice(0, d.getUTCMonth()).reduce((a, b) => a + b, 0) *
					86400;
				total += (d.getUTCDate() - 1) * 86400;
				total += d.getUTCHours() * 3600;
				total += d.getUTCMinutes() * 60;
				total += d.getUTCSeconds();
				return (total * 100) / full;
			}
			function round(n: number, k: number) {
				let factor = 10 ** k;
				return Math.round(n * factor) / factor;
			}
			let cv = canvas.createCanvas(400, 40);
			let ctx = cv.getContext("2d");
			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, 400, 40);
			ctx.fillStyle = "#747f8d";
			ctx.fillRect(5, 5, 390, 30);
			ctx.fillStyle = "#43b581";
			ctx.fillRect(5, 5, Math.floor((390 / 100) * getProgress(date)), 30);
			message.client.logger.info(
				`Command Yeardata used: ${cy} is ${round(getProgress(date), 13).toFixed(
					2,
				)}% complete.`,
			);
			return message.reply({
				content: `**${cy}** is **${round(getProgress(date), 13).toFixed(
					2,
				)}%** complete.`,
				files: [{ attachment: cv.toBuffer(), name: "yearprogress.jpg" }],
			});
		}

		if (args[0] === "worldclock") {
			let gmt = new Date().toLocaleString("en-US", {
				timeZone: "Europe/London",
			});
			let est = new Date().toLocaleString("en-US", {
				timeZone: "America/New_York",
			});
			let pst = new Date().toLocaleString("en-US", {
				timeZone: "America/Los_Angeles",
			});
			let cst = new Date().toLocaleString("en-US", {
				timeZone: "America/Mexico_City",
			});
			let cet = new Date().toLocaleString("en-US", {
				timeZone: "CET",
			});
			let mst = new Date().toLocaleString("en-US", {
				timeZone: "America/Phoenix",
			});
			let aest = new Date().toLocaleString("en-US", {
				timeZone: "Australia/Sydney",
			});
			let awst = new Date().toLocaleString("en-US", {
				timeZone: "Australia/Perth",
			});
			let kst = new Date().toLocaleString("en-US", {
				timeZone: "Asia/Seoul",
			});
			let ist = new Date().toLocaleString("en-US", {
				timeZone: "Asia/Calcutta",
			});
			let bst = new Date().toLocaleString("en-US", {
				timeZone: "Asia/Dhaka",
			});

			const worldClock = new EmbedBuilder()
				.setTitle("World Clock - Timezones")

				.addFields(
					{
						name: ":flag_us: New York (EST)",
						value: `${est}\n(GMT-5)`,
						inline: true,
					},
					{
						name: ":flag_us: Los Angles (PST)",
						value: `${pst}\n(GMT-8)`,
						inline: true,
					},
					{
						name: ":flag_us: Mexico City (CST)",
						value: `${cst}\n(GMT-7)`,
						inline: true,
					},
					{
						name: ":flag_us: Phoenix",
						value: `${mst}\n(GMT-7)`,
						inline: true,
					},
					{
						name: ":flag_eu: London (GMT)",
						value: `${gmt}\n(GMT+0/GMT+1)`,
						inline: true,
					},
					{
						name: ":flag_eu: Central (CET)",
						value: `${cet}\n(GMT+1)`,
						inline: true,
					},
					{
						name: "\u200B",
						value: "\u200B",
						inline: true,
					},
					{
						name: ":flag_kr: Korean (KST)",
						value: `${kst}\n(GMT+9)`,
						inline: true,
					},
					{
						name: ":flag_in: India (IST)",
						value: `${ist}\n(GMT+05:30)`,
						inline: true,
					},
					{
						name: ":flag_bd: Bangladesh (BST)",
						value: `${bst}\n(GMT+6)`,
						inline: true,
					},
					{
						name: ":flag_au: Sydney (AEST)",
						value: `${aest}\n(GMT+11)`,
						inline: true,
					},
					{
						name: ":flag_au: Perth (AWST)",
						value: `${awst}\n(GMT+8)`,
						inline: true,
					},
					{
						name: "\u200B",
						value: "\u200B",
						inline: true,
					},
				)
				.setColor("#e91e63")
				.setFooter({
					text: `Requested by: ${message.author.tag}`,
					iconURL: message.author.displayAvatarURL(),
				});

			return message.reply({
				embeds: [worldClock],
			});
		}

		if (args[0] === "cel-tos") {
			const tos = new EmbedBuilder()
				.setAuthor({
					name: "Celestine Terms of Service and Privacy Policy",
					iconURL: `${message.client.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setColor(0xe91e63)
				.setDescription(
					'By using Celestine Bot Services, you agree to our terms and conditions. Your agreement with us includes these terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood the agreements and agree to be bound by them.',
				)
				.addFields(
					{
						name: "Data",
						value: `By Using Celestine Bot you agree to give us access to the following information:`,
						inline: false,
					},
					{
						name: "Logging:",
						value: `- User ID\n- Server ID\n- User Discriminator and Name`,
						inline: false,
					},
				);

			const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.com/terms")
					.setLabel("Discord TOS"),

				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.com/guidelines")
					.setLabel("Discord Guidelines"),
			);

			return message.reply({ embeds: [tos], components: [buttons] });
		}

		if (args[0] === "levels") {
			let messagefetch = await db.get(
				`messages_${message.guild?.id}_${message.author.id}`,
			);
			let levelfetch = await db.get(
				`level_${message.guild?.id}_${message.author.id}`,
			);

			if (messagefetch == null) messagefetch = "0";
			if (levelfetch == null) levelfetch = "0";

			const embed = new EmbedBuilder()
				.setTitle(`${targetMember.tag}'s Rank!`)
				.setDescription(
					`Level: \`${levelfetch}\`\nMessages Sent: \`${messagefetch}\` Messages`,
				)
				.setColor(targetMember.hexAccentColor ?? 0xe91e63)
				.setFooter({
					text: `Requested by ${message.author.tag}`,
					iconURL: `${message.author.displayAvatarURL({
						forceStatic: true,
					})}`,
				});

			return message.reply({ embeds: [embed] });
		}

		if (args[0] === "ping") {
			const ping = message.createdTimestamp;

			const days = Math.floor(message.client.uptime / 86400000);
			const hours = Math.floor(message.client.uptime / 3600000) % 24;
			const minutes = Math.floor(message.client.uptime / 60000) % 60;
			const seconds = Math.floor(message.client.uptime / 1000) % 60;

			const Embed = new EmbedBuilder()
				.setColor(0xe91e63)
				.setAuthor({
					name: `🏓 Pong!`,
					iconURL: `${message.client.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setFooter({
					text: `Requested by: ${message.author.tag}`,
					iconURL: `${message.author.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.addFields(
					{
						name: "📊 | Bot Latency",
						value: `${ping} ms`,
						inline: true,
					},
					{
						name: "📈 | API Latency",
						value: `${message.client.ws.ping} ms`,
						inline: true,
					},
					{
						name: "🔋 | Memory Usage",
						value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
							2,
						)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
						inline: true,
					},
					// {
					// 	name: "CPU Usage",
					// 	value: `${}`,
					// 	inline: true
					// },
					{
						name: "🕛 | Uptime",
						value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, and \`${seconds}\` seconds`,
					},
				)
				.setTimestamp();

			return message.reply({
				embeds: [Embed],
			});
		}

		if (args[0] === "links") {
			const linksEmbed = new EmbedBuilder()
				.setTitle("🔗 Celestine Links")
				.setColor(0xe91e63)
				.addFields(
					{
						name: "Invite me to your server!",
						value: `- [Bot invite link](${"https://bit.ly/3elK1fY"})`,
						inline: true,
					},
					{
						name: "Support server!",
						value: `- [Support server link](${"https://discord.gg/DctSx3aTgT"})`,
						inline: true,
					},
					{
						name: "\u200b",
						value: "\u200b",
						inline: true,
					},
					{
						name: `Support ${message.client.user.username} Developer on Ko-Fi!`,
						value: `- [Ko-Fi link](${"https://ko-fi.com/fawnino"})`,
						inline: true,
					},
					{
						name: "\u200b",
						value: "\u200b",
						inline: true,
					},
				);

			const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setURL(
						"https://discord.com/api/oauth2/authorize?client_id=1021374807683637249&permissions=8&scope=applications.commands%20bot",
					)
					.setLabel("Invite Me")
					.setEmoji("📨")
					.setStyle(ButtonStyle.Link),
				new ButtonBuilder()
					.setURL("https://discord.gg/DctSx3aTgT")
					.setLabel("Support Server")
					.setEmoji("🌙")
					.setStyle(ButtonStyle.Link),
				new ButtonBuilder()
					.setURL("https://ko-fi.com/fawnino")
					.setLabel("Ko-Fi")
					.setEmoji({ name: ":KoFi", id: "1024829502234296430" })
					.setStyle(ButtonStyle.Link),
			);
			return message.reply({
				embeds: [linksEmbed],
				components: [row],
			});
		}
	},
	async commandRun(interaction) {
		const Options = interaction.options.getSubcommand();
		if (!interaction.deferred) await interaction.deferReply();
		const user =
			(await interaction.options.getUser("target")?.fetch(true)) ||
			(await interaction.user.fetch(true));

		const totalUsers = interaction.client.guilds.cache.reduce(
			(acc, guild) => acc + guild.memberCount,
			0,
		);

		switch (Options) {
			case "user": {
				const UserCreated = Math.round(user.createdTimestamp / 1000);

				const avatarUserButton = new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setLabel(`Public Avatar link`)
					.setURL(
						`${user.displayAvatarURL({
							extension: "png",
							forceStatic: true,
							size: 1024,
						})}`,
					);

				const embed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setColor(user.hexAccentColor ?? "#5865f2")
					.addFields(
						{
							name: "Joined Discord:",
							value: `<t:${UserCreated}:F>, <t:${UserCreated}:R>`,
							inline: true,
						},
						{
							name: "Username:",
							value: `${user.username}`,
							inline: true,
						},
						{
							name: "Tag:",
							value: `#${user.discriminator}`,
							inline: true,
						},
						{
							name: "Account Type:",
							value: `${user.bot ? "Bot" : "Human"}`,
							inline: true,
						},
						{
							name: "ID:",
							value: `${user.id}`,
							inline: true,
						},
						{
							name: "Profile URL:",
							value: `[${user.tag}](${`https://discord.com/users/${user.id}`})`,
							inline: true,
						},
						{
							name: "Avatar URL:",
							value: `[Click on me to get the Avatar URL!](${user.displayAvatarURL(
								{
									forceStatic: true,
									size: 1024,
								},
							)})`,
							inline: false,
						},
						{
							name: "\u200B",
							value: "\u200B",
							inline: true,
						},
					)
					.setImage(
						user.displayAvatarURL({
							extension: "png",
							forceStatic: true,
							size: 1024,
						}),
					)
					.setFooter({
						text: `Requested by ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTimestamp();

				const fetchedMember = interaction.guild!.members.cache.get(user.id);

				const avatarMemberButton = new ButtonBuilder();

				if (
					fetchedMember &&
					user.displayAvatarURL() !== fetchedMember.displayAvatarURL()
				) {
					avatarMemberButton.setStyle(ButtonStyle.Link);
					avatarMemberButton.setLabel(`Server Avatar link`);
					avatarMemberButton.setURL(
						fetchedMember.displayAvatarURL({
							forceStatic: true,
						}),
					);
					embed.setDescription(
						`[Avatar URL](${user.displayAvatarURL({
							forceStatic: true,
							size: 1024,
						})})\n[Server Avatar URL](${fetchedMember.displayAvatarURL({
							forceStatic: true,
							size: 1024,
						})})`,
					);
					embed.setThumbnail(
						fetchedMember.displayAvatarURL({
							forceStatic: true,
						}),
					);
				} else {
					avatarMemberButton.setStyle(ButtonStyle.Link);
					avatarMemberButton.setLabel("Server Avatar");
					avatarMemberButton.setDisabled(true);
					avatarMemberButton.setURL(
						`https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`,
					);
				}

				const buttonRows = new ActionRowBuilder<ButtonBuilder>().addComponents([
					avatarUserButton,
					avatarMemberButton,
				]);
				return interaction.editReply({
					embeds: [embed],
					components: [buttonRows],
				});
			}
			case "server": {
				const titleCase = (
					str: GuildExplicitContentFilter | GuildVerificationLevel,
				) => {
					return String(str)
						.toLowerCase()
						.replace(/_/g, " ")
						.split(" ")
						.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
						.join(" ");
				};

				const ServerInformationEmbed = new EmbedBuilder()
					.setTitle(`${interaction.guild!.name}`)
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setThumbnail(
						interaction.guild!.iconURL({
							forceStatic: true,
						}) ?? "https://i.imgur.com/AWGDmiu.png",
					)
					.setDescription(
						`${interaction.guild!.name} was created on ${`<t:${Math.round(
							new Date(interaction.guild!.createdTimestamp).valueOf() / 1000,
						)}:F>`}`,
					)
					.setColor("Random")
					.addFields(
						{
							name: "Total Members",
							value: `${interaction.guild!.memberCount}`,
							inline: true,
						},
						{
							name: "Total Humans",
							value: `${
								interaction.guild!.members.cache.filter(
									(member) => !member.user.bot,
								).size
							}`,
							inline: true,
						},
						{
							name: "Total Bots",
							value: `${
								interaction.guild!.members.cache.filter(
									(member) => member.user.bot,
								).size
							}`,
							inline: true,
						},
						{
							name: "Categories",
							value: `${
								interaction.guild!.channels.cache.filter(
									(c) => c.type === ChannelType.GuildCategory,
								).size
							}`,
							inline: true,
						},
						{
							name: "Text Channels",
							value: `${
								interaction.guild!.channels.cache.filter(
									(c) => c.type === ChannelType.GuildText,
								).size
							}`,
							inline: true,
						},
						{
							name: "Voice Channels",
							value: `${
								interaction.guild!.channels.cache.filter(
									(c) => c.type === ChannelType.GuildVoice,
								).size
							}`,
							inline: true,
						},
						{
							name: "Role Count",
							value: `${interaction.guild!.roles.cache.size}`,
							inline: true,
						},
						{
							name: "Boosts",
							value: `${interaction.guild!.premiumSubscriptionCount}`,
							inline: true,
						},
						{
							name: "Boost Tier",
							value: `${[interaction.guild!.premiumTier]}`,
							inline: true,
						},
						{
							name: "Explicit Content Filter",
							value: `${titleCase(interaction.guild!.explicitContentFilter)}`,
							inline: true,
						},
						{
							name: "Verification Level",
							value: `${titleCase(interaction.guild!.verificationLevel)}`,
							inline: true,
						},
						{
							name: "AFK Channel",
							value: `${interaction.guild!.afkChannel ?? "None"}`,
							inline: true,
						},
						{
							name: "AFK Timeout",
							value: interaction.guild!.afkChannel
								? `${moment
										.duration(interaction.guild!.afkTimeout * 1000)
										.asMinutes()} minute(s)`
								: "None",
							inline: true,
						},
						{
							name: "Owner",
							value: `<@${interaction.guild!.ownerId}>`,
							inline: true,
						},
						{
							name: "Region",
							value: `${interaction.guild!.preferredLocale}`,
							inline: true,
						},
					)
					.setFooter({
						text: `Server ID: ${interaction.guild!.id}`,
						iconURL: `${
							interaction.guild!.iconURL() ?? "https://i.imgur.com/AWGDmiu.png"
						}`,
					});
				if (interaction.guild!.description) {
					ServerInformationEmbed.addFields({
						name: "Server Description",
						value: `${interaction.guild!.description ?? "No description"}`,
						inline: true,
					});
				}

				if (interaction.guild!.bannerURL()) {
					ServerInformationEmbed.addFields({
						name: "Server Banner",
						value: `[Banner URL](${interaction.guild!.bannerURL()})`,
						inline: true,
					});
				}

				if (interaction.guild!.features.length > 0) {
					let guildFeatures = ``;
					for (let i = 0; i < interaction.guild!.features.length; i++) {
						guildFeatures =
							guildFeatures + `${interaction.guild!.features[i]}, `;
					}
					ServerInformationEmbed.addFields({
						name: "Server Features",
						value: `${capitalize(guildFeatures)}`,
						inline: false,
					});
				}

				return interaction.editReply({
					embeds: [ServerInformationEmbed],
				});
			}
			case "bot": {
				const days = Math.floor(interaction.client.uptime / 86400000);
				const hours = Math.floor(interaction.client.uptime / 3600000) % 24;
				const minutes = Math.floor(interaction.client.uptime / 60000) % 60;
				const seconds = Math.floor(interaction.client.uptime / 1000) % 60;

				const botInfoEmbed = new EmbedBuilder()
					.setTitle(`Client Information`)
					.addFields(
						{
							name: "Uptime",
							value: `**${days}** days, **${hours}** hours, **${minutes}** minutes, and **${seconds}** seconds`,
							inline: false,
						},
						{
							name: "Thread(s)",
							value: `**${os.cpus().length.toString()}**`,
							inline: true,
						},
						{
							name: "CPU",
							value: `**${os.cpus()[0].model}**`,
							inline: true,
						},
						{
							name: "Platform(s)",
							value: `**${process.platform}**`,
							inline: true,
						},
					)
					.setColor(0xe91e63);

				const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setCustomId("users")
						.setStyle(ButtonStyle.Secondary)
						.setLabel(`${totalUsers} User(s)`)
						.setDisabled(true),
					new ButtonBuilder()
						.setCustomId("servers")
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true)
						.setLabel(`${interaction.client.guilds.cache.size} Server(s)`),
				);

				return interaction.editReply({
					embeds: [botInfoEmbed],
					components: [buttons],
				});
			}
			case "worldclock": {
				let gmt = new Date().toLocaleString("en-US", {
					timeZone: "Europe/London",
				});
				let est = new Date().toLocaleString("en-US", {
					timeZone: "America/New_York",
				});
				let pst = new Date().toLocaleString("en-US", {
					timeZone: "America/Los_Angeles",
				});
				let cst = new Date().toLocaleString("en-US", {
					timeZone: "America/Mexico_City",
				});
				let cet = new Date().toLocaleString("en-US", {
					timeZone: "CET",
				});
				let mst = new Date().toLocaleString("en-US", {
					timeZone: "America/Phoenix",
				});
				let aest = new Date().toLocaleString("en-US", {
					timeZone: "Australia/Sydney",
				});
				let awst = new Date().toLocaleString("en-US", {
					timeZone: "Australia/Perth",
				});
				let kst = new Date().toLocaleString("en-US", {
					timeZone: "Asia/Seoul",
				});
				let ist = new Date().toLocaleString("en-US", {
					timeZone: "Asia/Calcutta",
				});
				let bst = new Date().toLocaleString("en-US", {
					timeZone: "Asia/Dhaka",
				});

				const worldClock = new EmbedBuilder()
					.setTitle("World Clock - Timezones")

					.addFields(
						{
							name: ":flag_us: New York (EST)",
							value: `${est}\n(GMT-5)`,
							inline: true,
						},
						{
							name: ":flag_us: Los Angles (PST)",
							value: `${pst}\n(GMT-8)`,
							inline: true,
						},
						{
							name: ":flag_us: Mexico City (CST)",
							value: `${cst}\n(GMT-7)`,
							inline: true,
						},
						{
							name: ":flag_us: Phoenix",
							value: `${mst}\n(GMT-7)`,
							inline: true,
						},
						{
							name: ":flag_eu: London (GMT)",
							value: `${gmt}\n(GMT+0/GMT+1)`,
							inline: true,
						},
						{
							name: ":flag_eu: Central (CET)",
							value: `${cet}\n(GMT+1)`,
							inline: true,
						},
						{
							name: "\u200B",
							value: "\u200B",
							inline: true,
						},
						{
							name: ":flag_kr: Korean (KST)",
							value: `${kst}\n(GMT+9)`,
							inline: true,
						},
						{
							name: ":flag_in: India (IST)",
							value: `${ist}\n(GMT+05:30)`,
							inline: true,
						},
						{
							name: ":flag_bd: Bangladesh (BST)",
							value: `${bst}\n(GMT+6)`,
							inline: true,
						},
						{
							name: ":flag_au: Sydney (AEST)",
							value: `${aest}\n(GMT+11)`,
							inline: true,
						},
						{
							name: ":flag_au: Perth (AWST)",
							value: `${awst}\n(GMT+8)`,
							inline: true,
						},
						{
							name: "\u200B",
							value: "\u200B",
							inline: true,
						},
					)
					.setColor("#e91e63")
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				return interaction.editReply({
					embeds: [worldClock],
				});
			}
			case "yeardata": {
				let date = interaction.createdAt;
				let cy = date.getUTCFullYear();
				let notLeap = cy % 4;
				const currentYear = new Date().getFullYear();
				const isLeapYear = (year: number) =>
					year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
				function getProgress(d: Date) {
					let full = 31536000;
					let total = 0;
					if (!notLeap) {
						full += 86400;
						if (d.getUTCMonth() >= 2) total += 86400;
					}
					let monthDays = [
						31,
						isLeapYear(currentYear) ? 29 : 28,
						31,
						30,
						31,
						30,
						31,
						31,
						30,
						31,
						30,
						31,
					];
					total +=
						monthDays.slice(0, d.getUTCMonth()).reduce((a, b) => a + b, 0) *
						86400;
					total += (d.getUTCDate() - 1) * 86400;
					total += d.getUTCHours() * 3600;
					total += d.getUTCMinutes() * 60;
					total += d.getUTCSeconds();
					return (total * 100) / full;
				}
				function round(n: number, k: number) {
					let factor = 10 ** k;
					return Math.round(n * factor) / factor;
				}
				let cv = canvas.createCanvas(400, 40);
				let ctx = cv.getContext("2d");
				ctx.fillStyle = "#000000";
				ctx.fillRect(0, 0, 400, 40);
				ctx.fillStyle = "#747f8d";
				ctx.fillRect(5, 5, 390, 30);
				ctx.fillStyle = "#43b581";
				ctx.fillRect(5, 5, Math.floor((390 / 100) * getProgress(date)), 30);
				interaction.client.logger.info(
					`Command Yeardata used: ${cy} is ${round(
						getProgress(date),
						13,
					).toFixed(2)}% complete.`,
				);
				return interaction.editReply({
					content: `**${cy}** is **${round(getProgress(date), 13).toFixed(
						2,
					)}%** complete.`,
					files: [{ attachment: cv.toBuffer(), name: "yearprogress.jpg" }],
				});
			}
			case "links": {
				const linksEmbed = new EmbedBuilder()
					.setTitle("🔗 Celestine Links")
					.setColor(0xe91e63)
					.addFields(
						{
							name: "Invite me to your server!",
							value: `- [Bot invite link](${"https://bit.ly/3elK1fY"})`,
							inline: true,
						},
						{
							name: "Support server!",
							value: `- [Support server link](${"https://discord.gg/DctSx3aTgT"})`,
							inline: true,
						},
						{
							name: "\u200b",
							value: "\u200b",
							inline: true,
						},
						{
							name: `Support ${interaction.client.user.username} Developer on Ko-Fi!`,
							value: `- [Ko-Fi link](${"https://ko-fi.com/fawnino"})`,
							inline: true,
						},
						{
							name: "\u200b",
							value: "\u200b",
							inline: true,
						},
					);

				const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setURL(
							"https://discord.com/api/oauth2/authorize?client_id=1021374807683637249&permissions=8&scope=applications.commands%20bot",
						)
						.setLabel("Invite Me")
						.setEmoji("📨")
						.setStyle(ButtonStyle.Link),
					new ButtonBuilder()
						.setURL("https://discord.gg/DctSx3aTgT")
						.setLabel("Support Server")
						.setEmoji("🌙")
						.setStyle(ButtonStyle.Link),
					new ButtonBuilder()
						.setURL("https://ko-fi.com/fawnino")
						.setLabel("Ko-Fi")
						.setEmoji({ name: ":KoFi", id: "1024829502234296430" })
						.setStyle(ButtonStyle.Link),
				);
				return interaction.editReply({
					embeds: [linksEmbed],
					components: [row],
				});
			}
			case "ping": {
				const ping = interaction.createdTimestamp;

				const days = Math.floor(interaction.client.uptime / 86400000);
				const hours = Math.floor(interaction.client.uptime / 3600000) % 24;
				const minutes = Math.floor(interaction.client.uptime / 60000) % 60;
				const seconds = Math.floor(interaction.client.uptime / 1000) % 60;

				const Embed = new EmbedBuilder()
					.setColor(0xe91e63)
					.setAuthor({
						name: `🏓 Pong!`,
						iconURL: `${interaction.client.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.addFields(
						{
							name: "📊 | Bot Latency",
							value: `${ping} ms`,
							inline: true,
						},
						{
							name: "📈 | API Latency",
							value: `${interaction.client.ws.ping} ms`,
							inline: true,
						},
						{
							name: "🔋 | Memory Usage",
							value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
								2,
							)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
							inline: true,
						},
						// {
						// 	name: "CPU Usage",
						// 	value: `${}`,
						// 	inline: true
						// },
						{
							name: "🕛 | Uptime",
							value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, and \`${seconds}\` seconds`,
						},
					)
					.setTimestamp();

				return interaction.editReply({
					embeds: [Embed],
				});
			}
			case "avatar": {
				const fetchedMember = interaction.guild!.members.cache.get(user.id);

				const avatarUserButton = new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setLabel(`Public Avatar link`)
					.setURL(
						`${user.displayAvatarURL({
							extension: "png",
							forceStatic: true,
							size: 1024,
						})}`,
					);

				const embed = new EmbedBuilder()
					.setTitle(`${user.tag}'s avatar`)
					.setDescription(
						`[Avatar URL](${user.displayAvatarURL({
							forceStatic: true,
							size: 1024,
						})})`,
					)
					.setColor(user.hexAccentColor ?? "#5865f2")
					.setFooter({
						text: `Requested By: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL()}`,
					})
					.setImage(
						user.displayAvatarURL({
							extension: "png",
							forceStatic: true,
							size: 1024,
						}),
					);

				const avatarMemberButton = new ButtonBuilder();

				if (
					fetchedMember &&
					user.displayAvatarURL() !== fetchedMember.displayAvatarURL()
				) {
					avatarMemberButton.setStyle(ButtonStyle.Link);
					avatarMemberButton.setLabel(`Server Avatar link`);
					avatarMemberButton.setURL(
						fetchedMember.displayAvatarURL({
							forceStatic: true,
						}),
					);
					embed.setDescription(
						`[Avatar URL](${user.displayAvatarURL({
							forceStatic: true,
							size: 1024,
						})})\n[Server Avatar URL](${fetchedMember.displayAvatarURL({
							forceStatic: true,
							size: 1024,
						})})`,
					);
					embed.setThumbnail(
						fetchedMember.displayAvatarURL({
							forceStatic: true,
						}),
					);
				} else {
					avatarMemberButton.setStyle(ButtonStyle.Link);
					avatarMemberButton.setLabel("Server Avatar");
					avatarMemberButton.setDisabled(true);
					avatarMemberButton.setURL(
						`https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`,
					);
				}

				const buttonRows = new ActionRowBuilder<ButtonBuilder>().addComponents([
					avatarUserButton,
					avatarMemberButton,
				]);

				return interaction.editReply({
					embeds: [embed],
					components: [buttonRows],
				});
			}
			case "cel-tos": {
				const tos = new EmbedBuilder()
					.setAuthor({
						name: "Celestine Terms of Service and Privacy Policy",
						iconURL: `${interaction.client.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setColor(0xe91e63)
					.setDescription(
						'By using Celestine Bot Services, you agree to our terms and conditions. Your agreement with us includes these terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood the agreements and agree to be bound by them.',
					)
					.addFields(
						{
							name: "Data",
							value: `By Using Celestine Bot you agree to give us access to the following information:`,
							inline: false,
						},
						{
							name: "Logging:",
							value: `- User ID\n- Server ID\n- User Discriminator and Name`,
							inline: false,
						},
					);

				const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link)
						.setURL("https://discord.com/terms")
						.setLabel("Discord TOS"),

					new ButtonBuilder()
						.setStyle(ButtonStyle.Link)
						.setURL("https://discord.com/guidelines")
						.setLabel("Discord Guidelines"),
				);

				return interaction.editReply({ embeds: [tos], components: [buttons] });
			}
			case "levels": {
				let messagefetch = await db.get(
					`messages_${interaction.guild?.id}_${interaction.user.id}`,
				);
				let levelfetch = await db.get(
					`level_${interaction.guild?.id}_${interaction.user.id}`,
				);

				if (messagefetch == null) messagefetch = "0";
				if (levelfetch == null) levelfetch = "0";

				const embed = new EmbedBuilder()
					.setTitle(`${user.tag}'s Rank!`)
					.setDescription(
						`Level: \`${levelfetch}\`\nMessages Sent: \`${messagefetch}\` Messages`,
					)
					.setColor(user.hexAccentColor ?? 0xe91e63)
					.setFooter({
						text: `Requested by ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});

				return interaction.editReply({ embeds: [embed] });
			}
		}
	},
});

function capitalize(string: string) {
	return string
		.replace(/_/g, " ")
		.toLowerCase()
		.replace(/\b(\w)/g, (char) => char.toUpperCase());
}
