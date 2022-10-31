import { Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	ActionRowBuilder,
	APIButtonComponentWithCustomId,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ComponentType,
	EmbedBuilder,
} from "discord.js";

export default new Command({
	type: CommandType.ChatInput,
	description: "Flip a coin!",
	async commandRun(interaction) {
		const sides = ["Heads", "Tails"];
		const coinRandomFlip = Math.floor(Math.random() * sides.length) as 0 | 1;

		const buttons = sides.map((b) =>
			new ButtonBuilder()
				.setCustomId(b.toLowerCase())
				.setLabel(b)
				.setStyle(ButtonStyle.Primary),
		);

		const cfStart = new EmbedBuilder()
			.setTitle("Heads or Tails?")
			.setDescription(
				`Hello friend! I will guess a random side of a coin and you have to guess which side I'm thinking of!\n\nReady? Take your guess and click the buttons below!`,
			)
			.setColor(0x5865f2)
			.setAuthor({
				name: `${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({
					forceStatic: true,
				})}`,
			})
			.setFooter({
				text: "You have 30 seconds, Start Guessing!",
				iconURL: `${interaction.user.displayAvatarURL({ forceStatic: true })}`,
			});

		const sent = await interaction.reply({
			embeds: [cfStart],
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
				? `You guessed the side! It was **${sides[coinRandomFlip]}**`
				: `Sadge, you got the wrong side! It was **${sides[coinRandomFlip]}**`;

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
			const winConditions = i.customId === sides[coinRandomFlip].toLowerCase();
			colorButton(i.customId, winConditions);

			const cfData = new EmbedBuilder()
				.setTitle("Heads or Tails?")
				.setDescription(`${content(winConditions)}`)
				.setColor(0x5865f2)
				.setAuthor({
					name: `${interaction.user.tag}`,
					iconURL: `${interaction.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setFooter({
					text: contentFooter(winConditions),
					iconURL: `${interaction.client.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				});

			return i.update({
				embeds: [cfData],
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
			if (collected.size !== 0) return;
			const didntGuess = new EmbedBuilder()
				.setTitle("Heads or Tails?")
				.setColor("Red")
				.setDescription(
					`You didn't guess the side! It was **${coinRandomFlip}**`,
				)
				.setAuthor({
					name: `${interaction.user.tag}`,
					iconURL: `${interaction.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				})
				.setFooter({
					text: "Times up!",
					iconURL: `${interaction.client.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				});
			await interaction.editReply({
				embeds: [didntGuess],
				components: [
					new ActionRowBuilder<ButtonBuilder>().addComponents(buttons),
				],
			});
		});
	},
});
