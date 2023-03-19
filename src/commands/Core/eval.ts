import { CommandType } from "#lib/enums";
import { HexieCommand } from "#lib/structures";
import { ApplicationCommandOptionType } from "discord.js";
import { inspect } from "node:util";

export default new HexieCommand({
	category: "Core",
	type: CommandType.ChatInput,
	description: "Eval Some Code",
	ownerOnly: true,
	options: [
		{
			name: "code",
			description: "The code to evaluate",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],
	async messageRun(message, args) {
		if (!args.join(" "))
			return message.reply({
				content: "You need to input some code in order to use this command!",
			});

		const { client, channel, author, member, guild } = message;

		let result = await eval(args.join(" "));

		if (typeof result !== "string") {
			result = inspect(result);
		}

		return message.reply({
			embeds: [
				{
					description: `\`\`\`js\n${result}\n\`\`\``,
				},
			],
		});
	},
	async commandRun(interaction) {
		const code = interaction.options.getString("code", true);
		const { client, channel, user, member, guild } = interaction;
		await interaction.deferReply();

		let result = await eval(code);

		if (typeof result !== "string") {
			result = inspect(result);
		}

		return interaction.editReply({
			embeds: [
				{
					description: `\`\`\`js\n${result}\n\`\`\``,
				},
			],
		});
	},
});
