import { CommandType } from "#lib/enums";
import { HexieCommand } from "#lib/structures";
import {
	ActionRowBuilder,
	APIButtonComponentWithCustomId,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ComponentType,
	EmbedBuilder,
} from "discord.js";

export default new HexieCommand({
	category: "Fun",
	type: CommandType.ChatInput,
	aliases: ["hl"],
	description: "high low or same?",
	async commandRun(interaction) {
		// create a random number
		const randomNumber = Math.floor(Math.random() * 100) + 1;
		// create a hint random number
		const hintNumber = Math.floor(Math.random() * 100) + 1;

		const buttons = ["👆|High", "👊|Same", "👇|Low"].map((b) => {
			const [emoji, label] = b.split("|");
			return new ButtonBuilder()
				.setCustomId(label.toLowerCase())
				.setLabel(label)
				.setEmoji(emoji)
				.setStyle(ButtonStyle.Secondary);
		});

		const hlStart = new EmbedBuilder()
			.setTitle("👆 High, Same or Low? 👇")
			.setDescription(
				`Hello friend! I will guess a random number and you have to guess if it is higher or lower!\n\nReady? I'm thinking of the number **${hintNumber}**`,
			)
			.setAuthor({
				name: `${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setColor(0xfde4f2)
			.setFooter({
				text: "You have 30 seconds, Start Guessing!",
				iconURL: `${interaction.user.displayAvatarURL({ forceStatic: true })}`,
			});

		const sent = await interaction.reply({
			embeds: [hlStart],
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

		const content = (correct: boolean) =>
			correct
				? `You guessed the number! It was **${randomNumber}**`
				: `Sadge, you got it wrong! It was **${randomNumber}**`;

		const contentFooter = (correct: boolean) =>
			correct
				? `Congratulations you guessed the number!`
				: `Sadge, let's go get some ice cream to cheer you up.`;

		const colorButton = (id: string, win: boolean) => {
			buttons.forEach((b) => {
				if ((b.data as APIButtonComponentWithCustomId).custom_id !== id) return;
				b.setStyle(win ? ButtonStyle.Success : ButtonStyle.Danger);
			});
		};

		const computeResults = (i: ButtonInteraction) => {
			const winConditions =
				(randomNumber > hintNumber && i.customId === "high") ||
				(randomNumber === hintNumber && i.customId === "same") ||
				(randomNumber < hintNumber && i.customId === "low");

			colorButton(i.customId, winConditions);

			const contents = new EmbedBuilder()
				.setTitle("👆 High, Same or Low? 👇")
				.setDescription(`${content(winConditions)}`)
				.setAuthor({
					name: `${interaction.user.tag}`,
					iconURL: `${interaction.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setColor(0xfde4f2)
				.setFooter({
					text: contentFooter(winConditions),
					iconURL: `${interaction.client.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				});

			return i.update({
				embeds: [contents],
				components: [
					new ActionRowBuilder<ButtonBuilder>().addComponents(buttons),
				],
			});
		};

		buttons.forEach((b) => b.setDisabled(true));

		collector.on("collect", async (i) => {
			await computeResults(i);
		});

		collector.on("end", async (collected) => {
			const didntGuess = new EmbedBuilder()
				.setTitle("👆 High, Same or Low? 👇")
				.setAuthor({
					name: `${interaction.user.tag}`,
					iconURL: `${interaction.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setDescription(
					`You didn't guess the number! It was **${randomNumber}**`,
				)
				.setColor("Red")
				.setFooter({ text: "Guess better next time!" });
			if (collected.size !== 0) return;
			await interaction.editReply({
				embeds: [didntGuess],
				components: [
					new ActionRowBuilder<ButtonBuilder>().addComponents(buttons),
				],
			});
		});
	},
});
