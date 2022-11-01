import { Command, Paginator } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { EmbedBuilder } from "discord.js";

export default new Command({
	category: "Utilites",
	type: CommandType.ChatInput,
	description: "Get the bots help menu",
	guildIds: ["1011104283237830758"],
	async commandRun(interaction) {
		const { client } = interaction;
		const paginator = new Paginator({ ephemeral: true });

		const sortedCommands: { [x: string]: Command[] } = {};
		client.commands.forEach((command) => {
			if (!sortedCommands[command.category])
				sortedCommands[command.category] = [];
			sortedCommands[command.category].push(command);
		});

		const pages: EmbedBuilder[] = [];
		Object.keys(sortedCommands).forEach((category) => {
			const embed = new EmbedBuilder({ title: `${category} Commands!` });
			sortedCommands[category].forEach((command) => {
				embed.setDescription(
					`${embed.data.description ? "" : embed.data.description}**/${
						command.name
					}**\n${command.description}\n\n`,
				);
				embed.setColor("LuminousVividPink");
			});
			pages.push(embed);
		});

		paginator.setEmbeds(pages).run(interaction);
	},
});
