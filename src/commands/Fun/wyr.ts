import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

interface Data {
	question: string;
}
export default new CelestineCommand({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Play a would you rather game!",
	options: [
		{
			name: "rating",
			description: "Rating of the dare!",
			type: ApplicationCommandOptionType.String,
			choices: [
				{
					name: "PG",
					value: "pg",
				},
				{
					name: "PG13",
					value: "pg13",
				},
				{
					name: "R",
					value: "r",
				},
			],
		},
	],
	async commandRun(interaction) {
		if (!interaction.deferred) await interaction.deferReply();
		const type = interaction.options.getString("rating");

		switch (type) {
			case "pg": {
				const response = await fetch(
					"https://api.truthordarebot.xyz/api/wyr?rating=pg",
				);
				const questions = (await response.json()) as Data;

				const questionPGEmbed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTitle(`Q: ${questions.question}`)
					.setColor(0x5865f2);
				return interaction.followUp({
					embeds: [questionPGEmbed],
				});
			}
			case "pg13": {
				const response = await fetch(
					"https://api.truthordarebot.xyz/api/wyr?rating=pg13",
				);
				const questions = (await response.json()) as Data;

				const questionPG13Embed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTitle(`Q: ${questions.question}`)
					.setColor(0x5865f2);
				return interaction.followUp({
					embeds: [questionPG13Embed],
				});
			}
			case "r": {
				const response = await fetch(
					"https://api.truthordarebot.xyz/api/wyr?rating=r",
				);
				const questions = (await response.json()) as Data;

				const questionREmbed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTitle(`Q: ${questions.question}`)
					.setColor(0x5865f2);
				return interaction.followUp({
					embeds: [questionREmbed],
				});
			}
		}

		const response = await fetch("https://api.truthordarebot.xyz/api/wyr");
		const questions = (await response.json()) as Data;

		const questionEmbed = new EmbedBuilder()
			.setAuthor({
				name: `${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setTitle(`Q: ${questions.question}`)
			.setColor(0x5865f2);
		return interaction.followUp({
			embeds: [questionEmbed],
		});
	},
});
