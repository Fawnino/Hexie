import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { QuickDB } from "quick.db";
import {
	ApplicationCommandOptionType,
	GuildMember,
	PermissionsBitField,
} from "discord.js";

const db = new QuickDB();

export default new CelestineCommand({
	category: "Utility",
	description: "Toggle levels for the current discord server.",
	type: CommandType.ChatInput,
	options: [
		{
			name: "toggle",
			description: "Turn on or turn off levels? (Default: Turn On)",
			type: ApplicationCommandOptionType.Boolean,
			required: true,
		},
	],
	async commandRun(interaction) {
		const Types = interaction.options.getBoolean("toggle");

		if (
			!(interaction.member as GuildMember).permissions.has([
				PermissionsBitField.Flags.ManageGuild,
			])
		)
			return interaction.reply({
				content:
					"You do not have the sufficient permission `ManageGuild` to use this command!",
				ephemeral: true,
			});

		switch (Types) {
			case true: {
				db.set(`serverlevels_${interaction.guild?.id}`, true);
				return interaction.reply({
					content:
						"Successfully turned on levels! A user will now get a message everytime a user levels up!",
					ephemeral: true,
				});
			}
			case false: {
				db.set(`serverlevels_$${interaction.guild?.id}`, false);
				return interaction.reply({
					content:
						"Successfully turned off levels! A user will no longer get a message or levels everytime a user sends a message!",
					ephemeral: true,
				});
			}
		}
	},
});
