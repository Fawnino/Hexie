import { CommandType } from "#lib/enums";
import { CelestineCommand } from "#lib/structures";
import { ApplicationCommandOptionType } from "discord.js";

export default new CelestineCommand({
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
		},
	],
	async messageRun(message, args) {
		if (!args.join(" "))
			return message.reply({ content: "Input something for me to say!" });

		await message.reply({
			content: `${message.author} said: ${args.join(" ")}`,
			allowedMentions: { repliedUser: false },
		});
	},
	async commandRun(interaction) {
		const text = interaction.options.getString("message");
		await interaction.reply({
			content: `${interaction.user.tag} said: ${text}`,
			allowedMentions: { repliedUser: false },
		});
	},
});
