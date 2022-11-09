import { CommandType } from "#lib/enums";
import { CelestineCommand } from "#lib/structures";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

export default new CelestineCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Set a timer.",
	options: [
		{
			name: "seconds",
			description: "The time in seconds",
			type: ApplicationCommandOptionType.Integer,
			required: true,
			min_length: 5,
			max_length: 86400,
		},
		{
			name: "reminder",
			description: "What to remind you about.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	async commandRun(interaction) {
		const time = interaction.options.getInteger("seconds");
		const subject = interaction.options.getString("reminder");
		const milliseconds = time! * 1000;

		const createdEmbed = new EmbedBuilder()
			.setColor(0x00ff00)
			.setTitle("⏱️ | Timer Set")
			.setAuthor({
				name: `${interaction.user.tag}'s Timer ⏱️`,
				iconURL: interaction.user.displayAvatarURL({
					size: 4096,
					forceStatic: true,
				}),
			})
			.setDescription(
				`In **${time} seconds**, I will remind you about **${subject}**`,
			)
			.setTimestamp();

		const doneEmbed = new EmbedBuilder()
			.setColor(0xff0000)
			.setTitle("⌛ | Timer Up!")
			.setAuthor({
				name: `${interaction.user.tag}'s Timer ⏱️`,
				iconURL: interaction.user.displayAvatarURL({
					size: 4096,
					forceStatic: true,
				}),
			})
			.setDescription(`**${subject}**\nTime set: **${time} seconds**`)
			.setTimestamp();

		await interaction.reply({
			embeds: [createdEmbed],
		});

		setTimeout(async () => {
			await interaction
				.editReply({
					embeds: [doneEmbed],
				})
				.catch((err) => {
					return;
				});
			interaction.user.send({ embeds: [doneEmbed] });
		}, milliseconds);
	},
});
