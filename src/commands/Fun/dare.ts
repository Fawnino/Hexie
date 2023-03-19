import { HexieCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

interface Data {
	question: string;
}
export default new HexieCommand({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Start a new Dare in truth or dare!",
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
					"https://api.truthordarebot.xyz/api/dare?rating=pg",
				);
				const questions = (await response.json()) as Data;
				const darePGEmbed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTitle(`${questions.question}`)
					.setColor(0xfde4f2);

				return interaction.editReply({
					embeds: [darePGEmbed],
				});
			}
			case "pg13": {
				const response = await fetch(
					"https://api.truthordarebot.xyz/api/dare?rating=pg13",
				);
				const questions = (await response.json()) as Data;
				const darePG13Embed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTitle(`${questions.question}`)
					.setColor(0xfde4f2);

				return interaction.editReply({
					embeds: [darePG13Embed],
				});
			}
			case "r": {
				const response = await fetch(
					"https://api.truthordarebot.xyz/api/dare?rating=r",
				);
				const questions = (await response.json()) as Data;
				const dareREmbed = new EmbedBuilder()
					.setAuthor({
						name: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setTitle(`${questions.question}`)
					.setColor(0xfde4f2);

				return interaction.editReply({
					embeds: [dareREmbed],
				});
			}
		}

		const response = await fetch("https://api.truthordarebot.xyz/api/dare");
		const questions = (await response.json()) as Data;
		const dareEmbed = new EmbedBuilder()
			.setAuthor({
				name: `${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setTitle(`${questions.question}`)
			.setColor(0xfde4f2);

		return interaction.editReply({
			embeds: [dareEmbed],
		});
	},
});
