import { HexieCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import fetch from "node-fetch";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

interface Images {
	image: string;
	url: string;
}
export default new HexieCommand({
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
					.setDescription(`[Add Me!](https://bit.ly/3elK1fY)`)
					.setColor(0xfde4f2);
				return interaction.editReply({ embeds: [dogEmbed] });
			}
			case "cat": {
				const res = await fetch("https://some-random-api.ml/animal/cat");
				const img = (await res.json()) as Images;

				const catEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`[Add Me!](https://bit.ly/3elK1fY)`)
					.setColor(0xfde4f2);
				return interaction.editReply({ embeds: [catEmbed] });
			}
			case "panda": {
				const res = await fetch("https://some-random-api.ml/animal/panda");
				const img = (await res.json()) as Images;

				const pandaEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`[Add Me!](https://bit.ly/3elK1fY)`)
					.setColor(0xfde4f2);
				return interaction.editReply({ embeds: [pandaEmbed] });
			}
			case "fox": {
				const res = await fetch("https://some-random-api.ml/animal/fox");
				const img = (await res.json()) as Images;

				const foxEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`[Add Me!](https://bit.ly/3elK1fY)`)
					.setColor(0xfde4f2);
				return interaction.editReply({ embeds: [foxEmbed] });
			}
			case "koala": {
				const res = await fetch("https://some-random-api.ml/animal/koala");
				const img = (await res.json()) as Images;

				const koalaEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`[Add Me!](https://bit.ly/3elK1fY)`)
					.setColor(0xfde4f2);
				return interaction.editReply({ embeds: [koalaEmbed] });
			}
			case "bird": {
				const res = await fetch("https://some-random-api.ml/animal/bird");
				const img = (await res.json()) as Images;

				const birdEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`[Add Me!](https://bit.ly/3elK1fY)`)
					.setColor(0xfde4f2);
				return interaction.editReply({ embeds: [birdEmbed] });
			}
			case "racoon": {
				const res = await fetch("https://some-random-api.ml/animal/raccoon");
				const img = (await res.json()) as Images;

				const raccoonEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`[Add Me!](https://bit.ly/3elK1fY)`)
					.setColor(0xfde4f2);
				return interaction.editReply({ embeds: [raccoonEmbed] });
			}
			case "kangaroo": {
				const res = await fetch("https://some-random-api.ml/animal/kangaroo");
				const img = (await res.json()) as Images;

				const kangarooEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setDescription(`[Add Me!](https://bit.ly/3elK1fY)`)
					.setColor(0xfde4f2);
				return interaction.editReply({ embeds: [kangarooEmbed] });
			}
			case "duck": {
				const res = await fetch("https://random-d.uk/api/v2/random");
				const img = (await res.json()) as Images;

				const duckEmbed = new EmbedBuilder()
					.setImage(img.url)
					.setDescription(`[Add Me!](https://bit.ly/3elK1fY)`)
					.setColor(0xfde4f2);
				return interaction.editReply({ embeds: [duckEmbed] });
			}
		}
	},
});
