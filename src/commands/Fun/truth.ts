import { Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import fetch from "node-fetch";

interface Data {
	question: string;
}
export default new Command({
	type: CommandType.ChatInput,
	description: "Start a new truth in truth or dare!",
	options: [
		{
			name: "rating",
			description: "Rating of the truth!",
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
					"https://api.truthordarebot.xyz/api/truth?rating=pg",
				);
				const questions = (await response.json()) as Data;
				const truthPGEmbed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTitle(`${questions.question}`)
					.setColor(0x5865f2);

				return interaction.followUp({
					embeds: [truthPGEmbed],
				});
			}
			case "pg13": {
				const response = await fetch(
					"https://api.truthordarebot.xyz/api/truth?rating=pg13",
				);
				const questions = (await response.json()) as Data;
				const truthPG13Embed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTitle(`${questions.question}`)
					.setColor(0x5865f2);

				return interaction.followUp({
					embeds: [truthPG13Embed],
				});
			}
			case "r": {
				const response = await fetch(
					"https://api.truthordarebot.xyz/api/truth?rating=r",
				);
				const questions = (await response.json()) as Data;
				const truthREmbed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTitle(`${questions.question}`)
					.setColor(0x5865f2);

				return interaction.followUp({
					embeds: [truthREmbed],
				});
			}
		}

		const response = await fetch("https://api.truthordarebot.xyz/api/truth");
		const questions = (await response.json()) as Data;
		const truthEmbed = new EmbedBuilder()
			.setAuthor({
				name: `${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setTitle(`${questions.question}`)
			.setColor(0x5865f2);

		return interaction.followUp({
			embeds: [truthEmbed],
		});
	},
});
