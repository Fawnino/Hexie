import { Listener, Logger } from "#lib/structures";
import { green } from "colorette";
import { QuickDB } from "quick.db";

const db = new QuickDB();
const logger = new Logger();

export default new Listener({
	event: "guildCreate",
	async run(guild) {
		await db.set(`serverlevels_${guild?.id}`, "on");
		logger.info(green(`Invited to a new Guild ${guild.name} // ${guild.id}`));
		// Logs a green text when the bot is Invited to a new Guild.
	},
});
