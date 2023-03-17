import { Listener, Logger } from "#lib/structures";
import { green } from "colorette";
const logger = new Logger();

export default new Listener({
	event: "guildCreate",
	async run(guild) {
		logger.info(green(`Invited to a new Guild ${guild.name} // ${guild.id}`));
		// Logs a green text when the bot is Invited to a new Guild.
	},
});
