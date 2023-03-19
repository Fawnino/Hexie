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
	async messageRun(message, args) {
		if (!args.join(" "))
			return message.reply({ content: "Input something for me to say!" });

		if (args.length > 1024)
			return message.reply({
				content: `Your message is too long, I can only send up to 1024 characters\n\nYour message: ${args.length} characters`,
			});

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
