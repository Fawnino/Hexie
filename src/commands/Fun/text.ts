import { HexieCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import fetch from "node-fetch";
import { ApplicationCommandOptionType } from "discord.js";

interface TextData {
	fancy: string;
	emojifyed: string;
	tiny: string;
	reversed: string;
	vaporwaved: string;
}
export default new HexieCommand({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Make your text different~!",
	options: [
		{
			name: "fancy",
			type: ApplicationCommandOptionType.Subcommand,
			description: "𝑀𝒶𝓀𝑒 𝓎𝑜𝓊𝓇 𝓉𝑒𝓍𝓉 𝒻𝒶𝓃𝒸𝓎~!",
			options: [
				{
					name: "text",
					type: ApplicationCommandOptionType.String,
					description: "Text to fancy.",
					required: true,
				},
			],
		},
		{
			name: "reverse",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Reverse your text!",
			options: [
				{
					name: "text",
					type: ApplicationCommandOptionType.String,
					description: "Text to reverse.",
					required: true,
				},
			],
		},
		{
			name: "emojify",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Emojify your text!",
			options: [
				{
					name: "text",
					type: ApplicationCommandOptionType.String,
					description: "Text to emojify.",
					required: true,
				},
			],
		},
		{
			name: "upsidedown",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Make your text up side down!",
			options: [
				{
					name: "text",
					type: ApplicationCommandOptionType.String,
					description: "Text to turn up side down.",
					required: true,
				},
			],
		},
		{
			name: "aesthetics",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Ｍａｋｅ ｙｏｕｒ ｔｅｘｔ ａｅｓｔｈｅｔｉｃ!",
			options: [
				{
					name: "text",
					type: ApplicationCommandOptionType.String,
					description: "Text to turn to aesthetic.",
					required: true,
				},
			],
		},
	],
	async commandRun(interaction) {
		if (!interaction.deferred) await interaction.deferReply();
		const text = interaction.options.getString("text");
		const Types = interaction.options.getSubcommand();

		switch (Types) {
			case "fancy": {
				const response = await fetch(
					`https://luminabot.xyz/api/text/fancy?text=${encodeURIComponent(
						text!,
					)}`,
				);
				const fancyText = (await response.json()) as TextData;
				return interaction.editReply({ content: `${fancyText.fancy}` });
			}
			case "emojify": {
				const numbersObj = {
					" ": "   ",
					"0": ":zero:",
					"1": ":one:",
					"2": ":two:",
					"3": ":three:",
					"4": ":four:",
					"5": ":five:",
					"6": ":six:",
					"7": ":seven:",
					"8": ":eight:",
					"9": ":nine:",
					"!": ":grey_exclamation:",
					"?": ":grey_question:",
					"#": ":hash:",
					"*": ":asterisk:",
				};

				"abcdefghijklmnopqrstuvwxyz".split("").forEach((letter) => {
					numbersObj[letter as keyof typeof numbersObj] = numbersObj[
						letter.toUpperCase() as keyof typeof numbersObj
					] = ` :regional_indicator_${letter}:`;
				});

				return interaction.editReply({
					content: `${text!
						.split("")
						.map((c) => numbersObj[c as keyof typeof numbersObj] || c)
						.join("")}`,
				});
			}
			case "upsidedown": {
				const response = await fetch(
					`https://luminabot.xyz/api/text/upsidedown?text=${encodeURIComponent(
						text!,
					)}`,
				);
				const Text = (await response.json()) as TextData;
				return interaction.editReply({ content: `${Text.tiny}` });
			}
			case "reverse": {
				const response = await fetch(
					`https://luminabot.xyz/api/text/reverse?text=${encodeURIComponent(
						text!,
					)}`,
				);
				const Text = (await response.json()) as TextData;
				return interaction.editReply({ content: `${Text.reversed}` });
			}
			case "aesthetics": {
				const response = await fetch(
					`https://luminabot.xyz/api/text/vaporwave?text=${encodeURIComponent(
						text!,
					)}`,
				);
				const Text = (await response.json()) as TextData;
				return interaction.editReply({ content: `${Text.vaporwaved}` });
			}
		}
	},
});
