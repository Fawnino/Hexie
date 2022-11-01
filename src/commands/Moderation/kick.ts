import { Confirmation, Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { ApplicationCommandOptionType, GuildMember } from "discord.js";

export default new Command({
	category: "Moderation",
	type: CommandType.ChatInput,
	description: "Kick a user.",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "The user to kick",
			required: true,
		},
		{
			name: "reason",
			type: ApplicationCommandOptionType.String,
			description: "The reason to kick this user",
		},
	],
	async commandRun(interaction) {
		const target = await interaction.guild?.members.fetch(
			`${(interaction.options.getMember("user") as GuildMember).id}`,
		);
		const kickReason =
			interaction.options.getString("reason") || "No reason provided.";

		if (!target?.kickable) return interaction.reply({ embeds:})
		else target?.kick();
	},
});
