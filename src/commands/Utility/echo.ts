import { CommandType } from "#lib/enums";
import { HexieCommand } from "#lib/structures";
import { ApplicationCommandOptionType } from "discord.js";

export default new HexieCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	aliases: ["say"],
	description: "Echoes what you say.",
	options: [
		{
			name: "message",
			description: "Message you want to echo.",
			type: ApplicationCommandOptionType.String,
			required: true,
			min_length: 1,
			max_length: 1024,
		},
	],
	async commandRun(interaction) {
		const text = interaction.options.getString("message");
		await interaction.reply({
			content: `${text}`,
			allowedMentions: { repliedUser: false },
		});
	},
});
