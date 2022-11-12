import { Listener, Logger } from "#lib/structures";
import { redBright } from "colorette";

const logger = new Logger();

export default new Listener({
	event: "guildDelete",
	async run(guild) {
		logger.info(
			redBright(`Removed from a Guild: ${guild.name} // ${guild.id}`),
		);
		// Logs a bright red text when the bot is kicked out of a guild.
	},
});
