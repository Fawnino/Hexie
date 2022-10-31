import { Listener } from "#lib/structures";
import { redBright } from "colorette";

export default new Listener({
	event: "guildDelete",
	async run(guild) {
		console.log(
			redBright(`Removed from a guild: ${guild.name} // ${guild.id}`),
		);
		// Logs a bright red text when the bot is kicked out of a guild.
	},
});
