import { CommandType } from "#lib/enums";
import { Command } from "#lib/structures";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
	category: "Utilities",
	type: CommandType.ChatInput,
	description: "Echoes what you say.",
	options: [
		{
			name: "message",
			description: "Message you want to echo.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	async commandRun(interaction) {
		const text = interaction.options.getString("message");
		await interaction.reply({
			content: `${interaction.user.tag} said: ${text}`,
			allowedMentions: { repliedUser: false },
		});
	},
});
