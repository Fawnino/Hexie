import { Listener } from "#lib/structures";
import { InteractionType } from "discord.js";
import { cyan, greenBright, underline } from "colorette";

export default new Listener({
	event: "interactionCreate",
	async run(interaction) {
		const { client } = interaction;
		if (
			interaction.isChatInputCommand() ||
			interaction.isContextMenuCommand()
		) {
			const command = client.commands.get(interaction.commandName);
			if (command && command.commandRun) {
				if (command.ownerOnly && !client.ownerIds.includes(interaction.user.id))
					return;
				try {
					await command.commandRun(interaction);

					client.logger.info(
						underline(
							cyan(`${interaction.user.tag} // ${interaction.user.id}`),
						) +
							` used ` +
							underline(greenBright(`${command.name}`)) +
							` in ` +
							underline(
								cyan(`${interaction.guild!.name} // ${interaction.guild!.id}`),
							),
					);
				} catch (error) {
					client.logger.error((error as Error).name);
				}
			}
		}

		if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
			const command = client.commands.get(interaction.commandName);

			if (command && command.autoCompleteRun && command.commandRun) {
				if (command.ownerOnly && !client.ownerIds.includes(interaction.user.id))
					return;

				if (command.name !== interaction.commandName) return;

				try {
					await command.autoCompleteRun(interaction);
				} catch (error) {
					client.logger.error((error as Error).name);
				}
			}
		}
	},
});
