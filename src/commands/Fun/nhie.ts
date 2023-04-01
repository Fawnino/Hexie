import { HexieCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import fetch from "node-fetch";
import {
	ActionRowBuilder,
	APIButtonComponentWithCustomId,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ComponentType,
	EmbedBuilder,
} from "discord.js";

interface NhieData {
	question: string;
}

export default new HexieCommand({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Play never have I ever!",
	async commandRun(interaction) {
		if (!interaction.deferred) await interaction.deferReply();

		const buttons = ["🙋|I Have", "🤷|Have I?", "🙅|Never"].map((b) => {
			const [emoji, label] = b.split("|");
			return new ButtonBuilder()
				.setCustomId(label.toLowerCase())
				.setLabel(label)
				.setEmoji(emoji)
				.setStyle(ButtonStyle.Secondary);
		});
		const response = await fetch("https://api.truthordarebot.xyz/api/nhie");

		const data = (await response.json()) as NhieData;

		const questionsEmbed = new EmbedBuilder()
			.setTitle(`${data.question}`)
			.setColor(0x5865f2)
			.setAuthor({
				name: `${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			});

		const sent = await interaction.editReply({
			embeds: [questionsEmbed],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(buttons),
			],
		});
		const collector = sent.createMessageComponentCollector({
			filter: (i) => i.user.id === interaction.user.id,
			time: 30000,
			max: 1,
			componentType: ComponentType.Button,
		});

		const colorButton = (id: string) => {
			buttons.forEach((b) => {
				if ((b.data as APIButtonComponentWithCustomId).custom_id !== id) return;
				b.setStyle(ButtonStyle.Success);
			});
		};

		const computeResults = (i: ButtonInteraction) => {
			const questionsEmbed2 = new EmbedBuilder()
				.setTitle(`${data.question}`)
				.setDescription(
					`<@${i.user.id}> answered: **${
						i.customId.charAt(0).toUpperCase() +
						i.customId.substring(1).toLowerCase()
					}**`,
				)
				.setColor(0x5865f2)
				.setAuthor({
					name: `${interaction.user.tag}`,
					iconURL: `${interaction.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setFooter({ text: "Interesting answer!" });

			colorButton(i.customId);
			return i.update({
				embeds: [questionsEmbed2],
				components: [
					new ActionRowBuilder<ButtonBuilder>().addComponents(buttons),
				],
			});
		};
		buttons.forEach((b) => b.setDisabled(true));

		collector.on("collect", async (i) => {
			await computeResults(i);
		});
	},
});
