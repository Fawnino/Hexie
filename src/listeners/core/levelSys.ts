import { Listener } from "#lib/structures";
import { ChannelType } from "discord.js";
import { QuickDB } from "quick.db";

export default new Listener({
	event: "messageCreate",
	async run(message) {
		const db = new QuickDB();
		if (message.author.bot) return;
		if ((message.channel.type as ChannelType) === ChannelType.DM) return;

		db.add(`messages_${message.guild?.id}_${message.author.id}`, 1);
		let messagefetch = await db.get(
			`messages_${message.guild?.id}_${message.author.id}`,
		);

		const toggle = await db.get(`serverlevels_${message.guild?.id}`);

		let messages;
		if (messagefetch == 25) messages = 25; // Level 1
		else if (messagefetch == 65) messages = 65; // Level 2
		else if (messagefetch == 115) messages = 115; // Level 3
		else if (messagefetch == 200) messages = 200; // Level 4
		else if (messagefetch == 300) messages = 300; // Level 5
		else if (messagefetch === 450) messages = 450; // Level 6
		else if (messagefetch === 600) messages = 600; // Level 7
		else if (messagefetch === 750) messages = 750; // Level 8
		else if (messagefetch === 900) messages = 900; // Level 9
		else if (messagefetch === 1200) messages = 1200; // Level 10
		else if (messagefetch === 1500) messages = 1500; // Level 11
		else if (messagefetch === 1750) messages = 1750; // Level 12
		else if (messagefetch === 2000) messages = 2000; // Level 13
		else if (messagefetch === 2250) messages = 2250; // Level 14
		else if (messagefetch === 2750) messages = 2750; // Level 15
		else if (messagefetch === 3250) messages = 3250; // Level 16
		else if (messagefetch === 3750) messages = 3750; // Level 17
		else if (messagefetch === 4250) messages = 4250; // Level 18
		else if (messagefetch === 4500) messages = 4500; // Level 19
		else if (messagefetch === 5000) messages = 5000; // Level 20

		if (toggle === "off") return;

		if (toggle === "on") {
			if (!isNaN(messages as number)) {
				db.add(`level_${message.guild?.id}_${message.author.id}`, 1);
				let levelfetch = (await db.get(
					`level_${message.guild?.id}_${message.author.id}`,
				)) as unknown as Promise<number>;

				message.reply({
					content: `GG! 🎉 ${message.author} levelled up to level **${
						(await levelfetch) + 1
					}**`,
				});
			}
		}
	},
});
