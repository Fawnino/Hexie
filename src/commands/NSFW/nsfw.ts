import { CommandType } from "#lib/enums";
import { Command } from "#lib/structures";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	ChannelType,
	TextChannel,
} from "discord.js";
import fetch from "node-fetch";

interface NSFW {
	url: string;
	image: string;
}
export default new Command({
	type: CommandType.ChatInput,
	description: "Get a certain nsfw image.",
	category: "NSFW",
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
			return interaction.followUp({
				content: "Please execute this in an nsfw channel!",
				ephemeral: true,
			});

		switch (Types) {
			case "4k": {
				const res = await fetch(`http://api.nekos.fun:8080/api/4k`);
				const img = (await res.json()) as NSFW;
				const fourkEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [fourkEmbed] });
			}
			case "spank": {
				const res = await fetch(`http://api.nekos.fun:8080/api/spank`);
				const img = (await res.json()) as NSFW;
				const spankEmbed = new EmbedBuilder()
					.setImage(img.image)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [spankEmbed] });
			}
			case "hentai": {
				const res = await fetch(`https://api.waifu.pics/nsfw/waifu`);
				const img = (await res.json()) as NSFW;
				const hentaiEmbed = new EmbedBuilder()
					.setImage(img.url)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [hentaiEmbed] });
			}
			case "neko": {
				const res = await fetch(`https://api.waifu.pics/nsfw/neko`);
				const img2 = (await res.json()) as NSFW;
				const nekoEmbed = new EmbedBuilder()
					.setImage(img2.url)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [nekoEmbed] });
			}
			case "blowjob": {
				const res = await fetch(`https://api.waifu.pics/nsfw/blowjob`);
				const img3 = (await res.json()) as NSFW;
				const blowjobEmbed = new EmbedBuilder()
					.setImage(img3.url)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [blowjobEmbed] });
			}
			case "trap": {
				const res = await fetch(`https://api.waifu.pics/nsfw/trap`);
				const img4 = (await res.json()) as NSFW;
				const trapEmbed = new EmbedBuilder()
					.setImage(img4.url)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [trapEmbed] });
			}
			case "feet": {
				const res = await fetch(`http://api.nekos.fun:8080/api/feet`);
				const img5 = (await res.json()) as NSFW;
				const feetEmbed = new EmbedBuilder()
					.setImage(img5.image)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [feetEmbed] });
			}
			case "gasm": {
				const res = await fetch(`http://api.nekos.fun:8080/api/gasm`);
				const img6 = (await res.json()) as NSFW;
				const pussyEmbed = new EmbedBuilder()
					.setImage(img6.image)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [pussyEmbed] });
			}
			case "boobs": {
				const res = await fetch(`http://api.nekos.fun:8080/api/boobs`);
				const img7 = (await res.json()) as NSFW;
				const boobsEmbed = new EmbedBuilder()
					.setImage(img7.image)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [boobsEmbed] });
			}
			case "lesbian": {
				const res = await fetch(`http://api.nekos.fun:8080/api/lesbian`);
				const img9 = (await res.json()) as NSFW;
				const lesbianEmbed = new EmbedBuilder()
					.setImage(img9.image)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [lesbianEmbed] });
			}
		}
	},
});
