import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import fetch from "node-fetch";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

interface Images {
	image: string;
	fact: string;
	message: string;
	url: string;
}
export default new CelestineCommand({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Get a random picture of an animal!",
	options: [
		{
			name: "type",
			description: "Type of animal you want to get an image of.",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{
					name: "Dog",
					value: "dog",
				},
				{
					name: "Cat",
					value: "cat",
				},
				{
					name: "Panda",
					value: "panda",
				},
				{
					name: "Fox",
					value: "fox",
				},
				{
					name: "Koala",
					value: "koala",
				},
				{
					name: "Bird",
					value: "bird",
				},
				{
					name: "Raccoon",
					value: "raccoon",
				},
				{
					name: "Kangaroo",
					value: "kangaroo",
				},
				{
					name: "Duck",
					value: "duck",
				},
			],
		},
	],
	async commandRun(interaction) {
		await interaction.deferReply();
		const type = interaction.options.getString("type", true);

		switch (type) {
			case "dog": {
				const res = await fetch("https://some-random-api.ml/animal/dog");
				const img = (await res.json()) as Images;

				const dogEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`Random Dog Fact: ${img.fact}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [dogEmbed] });
			}
			case "cat": {
				const res = await fetch("https://some-random-api.ml/animal/cat");
				const img = (await res.json()) as Images;

				const catEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`Random Cat Fact: ${img.fact}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [catEmbed] });
			}
			case "panda": {
				const res = await fetch("https://some-random-api.ml/animal/panda");
				const img = (await res.json()) as Images;

				const pandaEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`Random Panda Fact: ${img.fact}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [pandaEmbed] });
			}
			case "fox": {
				const res = await fetch("https://some-random-api.ml/animal/fox");
				const img = (await res.json()) as Images;

				const foxEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`Random Fox Fact: ${img.fact}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [foxEmbed] });
			}
			case "koala": {
				const res = await fetch("https://some-random-api.ml/animal/koala");
				const img = (await res.json()) as Images;

				const koalaEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`Random Koala Fact: ${img.fact}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [koalaEmbed] });
			}
			case "bird": {
				const res = await fetch("https://some-random-api.ml/animal/bird");
				const img = (await res.json()) as Images;

				const birdEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`Random Bird Fact: ${img.fact}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [birdEmbed] });
			}
			case "racoon": {
				const res = await fetch("https://some-random-api.ml/animal/raccoon");
				const img = (await res.json()) as Images;

				const raccoonEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`Random Raccoon Fact: ${img.fact}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [raccoonEmbed] });
			}
			case "kangaroo": {
				const res = await fetch("https://some-random-api.ml/animal/kangaroo");
				const img = (await res.json()) as Images;

				const kangarooEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`Random Kangaroo Fact: ${img.fact}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [kangarooEmbed] });
			}
			case "duck": {
				const res = await fetch("https://random-d.uk/api/v2/random");
				const img = (await res.json()) as Images;

				const duckEmbed = new EmbedBuilder()
					.setImage(img.url)
					.setFooter({ text: `${img.message}` })
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [duckEmbed] });
			}
		}
	},
});
