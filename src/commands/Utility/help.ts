import { HexieCommand, Paginator } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { EmbedBuilder } from "discord.js";

export default new HexieCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Get the bots help menu",
	async commandRun(interaction) {
		const { client } = interaction;
		const paginator = new Paginator({ ephemeral: true, time: 30_000 });

		const sortedCommands: { [x: string]: HexieCommand[] } = {};
		client.commands.forEach((command) => {
			if (!sortedCommands[command.category])
				sortedCommands[command.category] = [];
			sortedCommands[command.category].push(command);
		});

		const pages: EmbedBuilder[] = [];
		Object.keys(sortedCommands).forEach((category) => {
			const embed = new EmbedBuilder({
				footer: {
					text: `${category} Commands!`,
					iconURL: `${interaction.client.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				},
			});
			sortedCommands[category].forEach((command) => {
				embed.setAuthor({
					name: `${interaction.user.tag}`,
					iconURL: `${interaction.user.displayAvatarURL({
						forceStatic: true,
					})}`,
				});
				embed.setTitle("📃 | Help Menu");
				embed.setThumbnail(
					`${interaction.client.user.displayAvatarURL({ forceStatic: true })}`,
				);
				embed.setDescription(
					"The following fields will display the slash commands and legacy commands:",
				);
				embed.addFields({
					name: `/${command.name}`,
					value: `\n${command.description}\n\n`,
					inline: true,
				});
				embed.setColor("LuminousVividPink");
			});
			pages.push(embed);
		});

		paginator.setEmbeds(pages).run(interaction);
	},
});
