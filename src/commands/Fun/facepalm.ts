import { Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

interface Actions {
	link: string;
}
export default new Command({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Face palm 🤦",
	async commandRun(interaction) {
		const res = await fetch("https://some-random-api.ml/animu/face-palm");
		const facePalmLink = (await res.json()) as Actions;

		const facePalmEmbed = new EmbedBuilder()
			.setTitle(`${interaction.user.tag} face palmed 🤦`)
			.setImage(facePalmLink.link)
			.setColor("Random");

		return interaction.reply({ embeds: [facePalmEmbed] });
	},
});
