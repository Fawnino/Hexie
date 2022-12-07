import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

export default new CelestineCommand({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Rate Users.",
	options: [
		{
			name: "type",
			description: "Type of rating.",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{
					name: "Simp",
					value: "simp",
				},
				{
					name: "Waifu",
					value: "waifu",
				},
				{
					name: "UwU",
					value: "uwu",
				},
				{
					name: "Chad",
					value: "chad",
				},
				{
					name: "Gay",
					value: "gay",
				},
				{
					name: "PP",
					value: "pp",
				},
			],
		},
		{
			name: "user",
			description: "User to rate.",
			type: ApplicationCommandOptionType.User,
			required: false,
		},
	],
	async commandRun(interaction) {
		const Types = interaction.options.getString("type");
		const target = interaction.options.getUser("user") || interaction.user;

		switch (Types) {
			case "simp": {
				let simpembed = new EmbedBuilder()
					.setTitle("Simp rate Machine")
					.setColor("Random")
					.setThumbnail(
						`https://cdn.discordapp.com/attachments/1014815986773401631/1019513691751858186/b6e5c185f1d0461d22d7684768be70fb.jpg`,
					)
					.setDescription(
						`${target} is **${Math.floor(Math.random() * 100)}%/100%** simp`,
					)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});

				return interaction.reply({ embeds: [simpembed] });
			}
			case "gay": {
				let gayembed = new EmbedBuilder()
					.setTitle("🏳️‍🌈 | Gay rate Machine")
					.setColor("Random")
					.setDescription(
						`${target} is **${Math.floor(Math.random() * 100)}%/100%** gay`,
					)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});

				return interaction.reply({ embeds: [gayembed] });
			}
			case "waifu": {
				let waifuembed = new EmbedBuilder()
					.setTitle("Waifu rate Machine")
					.setColor("Random")
					.setThumbnail(
						`https://cdn.discordapp.com/attachments/1014815986773401631/1019513435890921562/mai-sakurajima_1wva.jpg`,
					)
					.setDescription(
						`${target} is **${Math.floor(Math.random() * 100)}%/100%** waifu`,
					)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});

				return interaction.reply({ embeds: [waifuembed] });
			}
			case "chad": {
				let chadembed = new EmbedBuilder()
					.setTitle("Chad rate Machine")
					.setColor("Random")
					.setThumbnail(
						`https://cdn.discordapp.com/attachments/1014815986773401631/1019515329199751178/IMG_4625.jpg`,
					)
					.setDescription(
						`${target} is **${Math.floor(Math.random() * 100)}%/100%** chad`,
					)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});

				return interaction.reply({ embeds: [chadembed] });
			}
			case "uwu": {
				let uwuembed = new EmbedBuilder()
					.setTitle("UwU Rate Machine")
					.setColor("Random")
					.setThumbnail(
						"https://cdn.discordapp.com/attachments/1014815986773401631/1019514607620083722/1200x1200bf-60.jpg",
					)
					.setDescription(
						`${target} is **${Math.floor(Math.random() * 100)}%/100%** uwu`,
					)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});

				return interaction.reply({ embeds: [uwuembed] });
			}
			case "pp": {
				const ppEmbed = new EmbedBuilder()
					.setTitle("🍆 | Random PP Generator")
					.setDescription(
						`${target} has a 8${"=".repeat(
							Math.floor(Math.random() * 20),
						)}D pp`,
					)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setColor("Random");
				return interaction.reply({ embeds: [ppEmbed] });
			}
		}
	},
});
