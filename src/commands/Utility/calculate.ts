import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from "discord.js";

export default new CelestineCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Calculate some math.",
	options: [
		{
			name: "num",
			type: ApplicationCommandOptionType.Number,
			description: "Number to calculate",
			required: true,
		},
		{
			name: "num-two",
			type: ApplicationCommandOptionType.Number,
			description: "2nd number to calculate",
			required: true,
		},
	],
	async commandRun(interaction) {
		const num1 = interaction.options.getNumber("num", true);
		const num2 = interaction.options.getNumber("num-two", true);

		const mathEmbed = new EmbedBuilder()
			.setTitle(`${num1} and ${num2}`)
			.setDescription(`Hey! Don't cheat in your homework!`)
			.setColor(0xe91e63)
			.setAuthor({
				name: `${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setTimestamp();

		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setLabel(`Addition: ${num1 + num2}`)
				.setStyle(ButtonStyle.Secondary)
				.setCustomId("add")
				.setDisabled(true),
			new ButtonBuilder()
				.setLabel(`Subtraction: ${num1 - num2}`)
				.setStyle(ButtonStyle.Secondary)
				.setCustomId("subtract")
				.setDisabled(true),
			new ButtonBuilder()
				.setLabel(`Multiplication: ${num1 * num2}`)
				.setStyle(ButtonStyle.Secondary)
				.setCustomId("multiply")
				.setDisabled(true),
			new ButtonBuilder()
				.setLabel(`Division: ${num1 / num2}`)
				.setStyle(ButtonStyle.Secondary)
				.setCustomId("divide")
				.setDisabled(true),
		);

		await interaction.reply({ embeds: [mathEmbed], components: [row] });
	},
});
