import { Listener } from "#lib/structures";
import { green } from "colorette";

export default new Listener({
	event: "guildCreate",
	async run(guild) {
		console.log(green(`Invited to a new Guild ${guild.name} // ${guild.id}`));
		// Logs a green text when the bot is Invited to a new Guild.
	},
});
