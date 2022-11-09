import { handleListener, handleRegistry, initiateCommands } from "#core";
import { LogLevel } from "#lib/enums";
import { CelestineCommand, Listener, Logger } from "#lib/structures";
import {
	Client as DJSClient,
	Collection,
	GatewayIntentBits,
	Partials,
} from "discord.js";
import "dotenv/config";
import { cyanBright, underline } from "colorette";

export class Client<Ready extends boolean = boolean> extends DJSClient<Ready> {
	public constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildPresences,
			],
			partials: [Partials.Channel, Partials.GuildMember],
		});

		this.logger.setLevel(LogLevel.Debug);
		this.prefixes = [":", "c:", "C:"];
		this.ownerIds = ["800976598043459604", "851270917732171817"]; // Insert your Discord ID Here
	}

	public prefixes: string[] = [];

	public ownerIds: string[] = [];

	public commands = new Collection<string, CelestineCommand>();

	public listener = new Collection<string, Listener>();

	public logger: Logger = new Logger();

	public override async login(token?: string | undefined): Promise<string> {
		handleRegistry(this);
		handleListener(this);
		const promiseString = await super.login(token);
		console.clear();
		this.logger.info(
			`Logged in as ${cyanBright(underline(`${this.user?.tag}`))}`,
		);
		await initiateCommands(this, {
			register: false, //! For detailed Registry
			sync: false, //! For syncing commands with local commands
			shortcut: true, //! Faster method, uses Routes (https://discordjs.guide/interactions/slash-commands.html#registering-slash-commands)
		});
		return promiseString;
	}
}

declare module "discord.js" {
	interface Client {
		ownerIds: string[];
		commands: Collection<string, CelestineCommand>;
		listener: Collection<string, Listener>;
		logger: Logger;
		prefixes: string[];
	}
}
