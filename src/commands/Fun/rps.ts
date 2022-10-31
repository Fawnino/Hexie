import { CommandType } from "#lib/enums";
import { Command } from "#lib/structures";
import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ComponentType,
	User,
} from "discord.js";

export default new Command({
	type: CommandType.ChatInput,
	description: "Play some RPS Games!",
	options: [
		{
			name: "user",
			description: "User you wanna play with.",
			type: ApplicationCommandOptionType.User,
			required: false,
		},
	],
	async commandRun(interaction) {
		const opponent =
			interaction.options.getUser("user") ?? interaction.client.user!;

		if (opponent.id === interaction.user.id)
			return interaction.reply(`Can't play with yourself dumb dumb`);

		const buttons = ["🪨|Rock", "📄|Paper", "✂|Scissors"].map((s) => {
			const [emoji, label] = s.split("|");
			return new ButtonBuilder()
				.setCustomId(label.toLowerCase())
				.setEmoji(emoji)
				.setLabel(label)
				.setStyle(ButtonStyle.Primary);
		});

		const row = new ActionRowBuilder<ButtonBuilder>();

		let content = `${interaction.user} vs ${opponent}`;

		if (!opponent.bot) {
			content += `\n\n> Waiting for **${interaction.user.username}**\n> Waiting for **${opponent.username}**`;
		}

		const sent = await interaction.reply({
			content,
			components: [row.setComponents(buttons)],
		});

		const collector = sent.createMessageComponentCollector({
			componentType: ComponentType.Button,
			filter: (i) => [interaction.user.id, opponent.id].includes(i.user.id),
			time: 60_000,
		});

		collector.on("ignore", async (i) => {
			await i.reply({
				content: `Couldn't ignore you less 🙄.`,
				ephemeral: true,
			});
		});

		let opponentChoice: Choice;
		let userChoice: Choice;

		const getResponses = (i: ButtonInteraction) => {
			opponentChoice ??= (
				opponent.bot
					? ["rock", "paper", "scissors"][(3 * Math.random()) | 0]
					: i.user.id === opponent.id
					? i.customId
					: undefined
			) as Choice;

			userChoice ??= (
				i.user.id === interaction.user.id ? i.customId : undefined
			) as Choice;
			return [userChoice, opponentChoice];
		};

		const computeResults = () => {
			content =
				content.split("\n")[0] +
				`\n\n> **${interaction.user.username}** chose **${emoji[userChoice]}!**` +
				`\n> **${opponent.username}** chose **${emoji[opponentChoice]}!**\n\n**Results:** `;

			const win = (user: User) => (content += `**${user} wins!** Good Game 🥳`);

			switch (`${userChoice}-${opponentChoice}` as Possibilities) {
				case "paper-rock":
				case "rock-scissors":
				case "scissors-paper":
					return win(interaction.user);
				case "paper-scissors":
				case "scissors-rock":
				case "rock-paper":
					return win(opponent);
				default:
					return (content += `**Woops!** There was a **tie!**`);
			}
		};

		buttons.forEach((b) => b.setDisabled());

		collector.on("collect", async (i) => {
			collector.resetTimer();
			const choices = getResponses(i).filter(Boolean);

			if (!opponent.bot && choices.length !== 2) {
				content = content.replace(
					`> Waiting for **${i.user.username}**`,
					`> **${i.user.username}** has chosen!`,
				);
				return void i.update(content);
			}
			collector.stop("finished");
			await i.update({
				content: computeResults(),
				components: [row.setComponents(buttons)],
			});
		});

		collector.on("end", async (_, r) => {
			if (r === "finished") return;
			await interaction.editReply({
				content: "Time up!",
				components: [row.setComponents(buttons)],
			});
		});
	},
});

type Choice = "rock" | "paper" | "scissors";

type Possibilities = `${Choice}-${Choice}`;

const emoji: Record<Choice, string> = {
	rock: "🪨",
	paper: "📄",
	scissors: "✂",
};
