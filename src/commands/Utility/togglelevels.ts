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
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{
					name: "Turn On",
					value: "on",
				},
				{
					name: "Turn Off",
					value: "off",
				},
			],
		},
	],
	async commandRun(interaction) {
		const Types = interaction.options.getString("toggle");

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
			case "on": {
				db.set(`serverlevels_${interaction.guild?.id}`, "on");
				return interaction.reply({
					content:
						"Successfully turned on levels! A user will now get a message everytime a user levels up!",
					ephemeral: true,
				});
			}
			case "off": {
				db.set(`serverlevels_$${interaction.guild?.id}`, "off");
				return interaction.reply({
					content:
						"Successfully turned off levels! A user will no longer get a message or levels everytime a user sends a message!",
					ephemeral: true,
				});
			}
		}
	},
});
