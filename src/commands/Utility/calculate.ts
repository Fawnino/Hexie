import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

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
			name: "sign",
			type: ApplicationCommandOptionType.String,
			description: "Sign to use for calculation.",
			required: true,
			choices: [
				{
					name: "Addition",
					value: "addition",
				},
				{
					name: "Subtraction",
					value: "subtraction",
				},
				{
					name: "Multiplication",
					value: "mutiplication",
				},
				{
					name: "Division",
					value: "division",
				},
			],
		},
		{
			name: "num-two",
			type: ApplicationCommandOptionType.Number,
			description: "2nd number to calculate",
			required: true,
		},
	],
	async commandRun(interaction) {
		const Signs = interaction.options.getString("sign", true);
		const num1 = interaction.options.getNumber("num", true);
		const num2 = interaction.options.getNumber("num-two", true);

		switch (Signs) {
			case "addition": {
				const additionEmbed = new EmbedBuilder()
					.setTitle(`${num1} + ${num2} = ${num1 + num2}`)
					.setDescription(`Hey! Don't cheat in your homework!`)
					.setColor(0x5865f2)
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTimestamp();

				return interaction.reply({ embeds: [additionEmbed] });
			}
			case "subtraction": {
				const subtractionEmbed = new EmbedBuilder()
					.setTitle(`${num1} - ${num2} = ${num1 - num2}`)
					.setDescription(`Hey! Don't cheat in your homework!`)
					.setColor(0x5865f2)
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTimestamp();

				return interaction.reply({ embeds: [subtractionEmbed] });
			}
			case "multiplication": {
				const multiplicationEmbed = new EmbedBuilder()
					.setTitle(`${num1} * ${num2} = ${num1 * num2}`)
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setDescription(`Hey! Don't cheat in your homework!`)
					.setColor(0x5865f2)
					.setTimestamp();

				return interaction.reply({ embeds: [multiplicationEmbed] });
			}
			case "division": {
				const divisionEmbed = new EmbedBuilder()
					.setTitle(`${num1} / ${num2} = ${num1 / num2}`)
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setDescription(`Hey! Don't cheat in your homework!`)
					.setColor(0x5865f2)
					.setTimestamp()
					.setFooter({
						text: `Requested by ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});

				return interaction.reply({ embeds: [divisionEmbed] });
			}
		}
	},
});
