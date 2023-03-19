import { CommandType } from "#lib/enums";
import { HexieCommand, Prompt } from "#lib/structures";
import { Message } from "discord.js";
import { magentaBright, gray } from "colorette";

const questions = [
	"How are you?",
	"How was your day?",
	"Do you find this prompt class useful?",
	"Final question, rate this class on a scale of 0-10",
];

export default new HexieCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Survey time!",
	aliases: ["s"],
	async messageRun(message, args) {
		const messageStart = await message.reply({ content: "Starting Survey..." });

		return prompt(messageStart);
	},
	async commandRun(interaction) {
		const message = await interaction.reply({
			content: "Starting Survey...",
			fetchReply: true,
		});

		return prompt(message);
	},
});

function prompt(message: Message) {
	new Prompt({ message, questions }).run().then((answers) => {
		if (!answers.length) return;
		console.log(
			"[" +
				magentaBright(` SURVEY `) +
				"]" +
				gray(" - ") +
				gray(`${answers.join(", ")}`),
		);

		return message.reply({
			content: `Survey Result\n${questions
				.map((q, i) => {
					const answer = answers[i] ?? "No answer";
					return `**Q:** ${q}\n**A:** ${answer}`;
				})
				.join("\n\n")}`,
			allowedMentions: { repliedUser: false },
		});
	});
}
