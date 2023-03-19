import { CommandType } from "#lib/enums";
import { HexieCommand } from "#lib/structures";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	ChannelType,
	TextChannel,
	AttachmentBuilder,
} from "discord.js";
import fetch from "node-fetch";

interface NSFW {
	url: string;
	image: string;
}
export default new HexieCommand({
	category: "NSFW",
	type: CommandType.ChatInput,
	description: "Get a certain nsfw image.",
	options: [
		{
			name: "type",
			description: "Type of nsfw image you want.",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{
					name: "4K",
					value: "4k",
				},
				{
					name: "Hentai",
					value: "hentai",
				},
				{
					name: "Blowjob",
					value: "blowjob",
				},
				{
					name: "Trap",
					value: "trap",
				},
				{
					name: "Spank",
					value: "spank",
				},
				{
					name: "Neko",
					value: "neko",
				},
				{
					name: "Feet",
					value: "feet",
				},
				{
					name: "Gasm",
					value: "gasm",
				},
				{
					name: "Boobs",
					value: "boobs",
				},
				{
					name: "Lesbian",
					value: "lesbian",
				},
			],
		},
	],
	async commandRun(interaction) {
		const Types = interaction.options.getString("type");
		await interaction.deferReply();
		if (interaction.channel!.type !== ChannelType.GuildText) return;

		if (!(interaction.channel! as TextChannel).nsfw)
			return interaction.editReply({
				content: "Please execute this in an nsfw channel!",
			});

		switch (Types) {
			case "4k": {
				const res = await fetch(`http://api.nekos.fun:8080/api/4k`);
				const img = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img.image, {
					name: "4k.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
			case "spank": {
				const res = await fetch(`http://api.nekos.fun:8080/api/spank`);
				const img = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img.image, {
					name: "drake.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
			case "hentai": {
				const res = await fetch(`https://api.waifu.pics/nsfw/waifu`);
				const img = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img.url, {
					name: "hentai.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
			case "neko": {
				const res = await fetch(`https://api.waifu.pics/nsfw/neko`);
				const img2 = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img2.url, {
					name: "neko.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
			case "blowjob": {
				const res = await fetch(`https://api.waifu.pics/nsfw/blowjob`);
				const img3 = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img3.url, {
					name: "blowjob.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
			case "trap": {
				const res = await fetch(`https://api.waifu.pics/nsfw/trap`);
				const img4 = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img4.url, {
					name: "trap.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
			case "feet": {
				const res = await fetch(`http://api.nekos.fun:8080/api/feet`);
				const img5 = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img5.image, {
					name: "feet.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
			case "gasm": {
				const res = await fetch(`http://api.nekos.fun:8080/api/gasm`);
				const img6 = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img6.image, {
					name: "gasm.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
			case "boobs": {
				const res = await fetch(`http://api.nekos.fun:8080/api/boobs`);
				const img7 = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img7.image, {
					name: "boobs.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
			case "lesbian": {
				const res = await fetch(`http://api.nekos.fun:8080/api/lesbian`);
				const img9 = (await res.json()) as NSFW;
				const finalImage = new AttachmentBuilder(img9.image, {
					name: "lesbian.png",
				});
				return interaction.editReply({ files: [finalImage] });
			}
		}
	},
});
