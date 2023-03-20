import { CommandType } from "#lib/enums";
import { HexieCommand, Paginator } from "#lib/structures";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
} from "discord.js";
import malScraper from "mal-scraper";
import fetch from "node-fetch";

// Interfaced Data
interface PokeData {
	name: string;
	id: string;
	type: [string];
	species: [string];
	abilities: [string];
	height: string;
	weight: string;
	base_experience: string;
	gender: [string];
	egg_groups: [string];
	stats: StatData;
	family: FamilyData;
	description: string;
	generation: string;
	sprites: SpriteData;
}

interface StatData {
	hp: string;
	attack: string;
	defense: string;
	sp_atk: string;
	sp_def: string;
	speed: string;
	total: string;
}

interface FamilyData {
	evolutionStage: number;
	evolutionLine: [string];
}

interface SpriteData {
	animated: string;
}

interface Data {
	list: DefinitionData[];
}
interface DefinitionData {
	definition: string;
	permalink: string;
	thumbs_up: number;
	author: string;
	word: string;
	example: string;
	thumbs_down: number;
}

export default new HexieCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Look around the internet!",
	options: [
		{
			name: "urban",
			description: "Word to look up in the urban dictionary.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "query",
					description: "Word to look up in the urban dictionary.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
		{
			name: "pokedex",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Get information about a pokemon.",
			options: [
				{
					name: "pokemon",
					description: "Pokemon to get information about.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
		{
			name: "anime",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Get information about an anime!",
			options: [
				{
					name: "query",
					description: "The anime you want to get advanced information on.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
	],
	async commandRun(interaction) {
		if (!interaction.deferred) await interaction.deferReply();
		const query = interaction.options.getString("query");
		const genshinCharacter = interaction.options.getString("character");
		const Types = interaction.options.getSubcommand();

		switch (Types) {
			case "urban": {
				const response = await fetch(
					`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
						query!,
					)}`,
				);

				try {
					const data = (await response.json()) as Data;

					const strings = [
						`${data.list[0].definition}`,
						`${data.list[0].example}`,
					];
					const titles = [
						`Definition | ${data.list[0].word}`,
						`Examples | ${data.list[0].word}`,
					];

					const embeds = titles.map((x, i) =>
						new EmbedBuilder()
							.setTitle(x)
							.setDescription(strings[i])
							.setColor(0xfde4f2)
							.setAuthor({
								name: `${data.list[0].author}`,
								iconURL:
									"https://cdn.discordapp.com/attachments/1022466108818726912/1031710871539425300/unknown.png",
							})
							.addFields({
								name: `RATING`,
								value: `${data.list[0].thumbs_up} 👍 || ${data.list[0].thumbs_down} 👎`,
							}),
					);
					const pagination = new Paginator({
						embeds,
						time: 30_000,
					});
					return pagination.run(interaction);
				} catch (err) {
					interaction.client.logger.error(`Urban Command Error: ${err}`);
					return interaction.editReply({
						content: `Could not find word ${query}, please try again with a valid word!`,
					});
				}
			}
			case "pokedex": {
				const query = interaction.options.getString("pokemon");
				const response = await fetch(
					`https://some-random-api.ml/pokemon/pokedex?pokemon=${encodeURIComponent(
						query!,
					)}`,
				);
				const res = (await response.json()) as PokeData;

				try {
					const pokemonEmbed = new EmbedBuilder()
						.setTitle(
							`${
								res.name.toUpperCase().charAt(0) +
								res.name.toLowerCase().substring(1)
							} #${res.id}`,
						)
						.setDescription(`${res.description}`)
						.setColor(0xfde4f2)
						.setThumbnail(`${res.sprites.animated}`)
						.addFields(
							{
								name: "Type",
								value: `**${res.type.join(", ")}**`,
								inline: true,
							},
							{
								name: "Species",
								value: `**${res.species.join(", ")}**`,
								inline: true,
							},
							{
								name: "Abilities",
								value: `**${res.abilities.join(", ")}**`,
								inline: true,
							},
							{
								name: "Height",
								value: `**${res.height}**`,
								inline: true,
							},
							{ name: "Weight", value: `**${res.weight}**`, inline: true },
							{
								name: "Base Experience",
								value: `**${res.base_experience}**`,
								inline: true,
							},
							{
								name: "Gender Rate",
								value: `**${res.gender.join(", ")}**`,
								inline: true,
							},
							{
								name: "Egg Groups",
								value: `**${res.egg_groups.join(", ")}**`,
								inline: true,
							},
							{
								name: "Stats",
								value: `**${res.stats.hp}** Hp\n**${res.stats.attack}** Attack\n**${res.stats.defense}** Defence\n**${res.stats.sp_atk}** Special Attack\n**${res.stats.speed}** Speed\n Total: **${res.stats.total}**`,
								inline: true,
							},
							{
								name: "Evolution Line",
								value: `**${
									res.family.evolutionStage ?? "No"
								}** Evoloutions\n Evolutions: **${
									res.family.evolutionLine.join(", ") ?? "No evolutions"
								}**`,
								inline: true,
							},
							{
								name: "Generation",
								value: `**${res.generation}**`,
								inline: true,
							},
						);
					return interaction.editReply({ embeds: [pokemonEmbed] });
				} catch (err) {
					interaction.client.logger.error(`Pokemon Command Error: ${err}`);
					return interaction.editReply({
						content: "Could not find that pokemon!",
					});
				}
			}
			case "anime": {
				malScraper.getInfoFromName(`${query}`).then(async (data) => {
					const malEmbed = new EmbedBuilder()
						.setTitle(`My Anime List search result for ${data.title}`)
						.setThumbnail(`${data.picture}`)
						.setColor(0xfde4f2)
						.addFields(
							{
								name: "Premiered",
								value: `\`${data.premiered}\``,
								inline: true,
							},
							{
								name: "Broadcast",
								value: `\`${data.broadcast}\``,
								inline: true,
							},
							{
								name: "Genres",
								value: `\`${data.genres?.join(", ")}\``,
								inline: true,
							},
							{
								name: "English Title",
								value: `\`${data.englishTitle}\``,
								inline: true,
							},
							{
								name: "Type",
								value: `\`${data.type}\``,
								inline: true,
							},
							{
								name: "Episodes",
								value: `\`${data.episodes}\``,
								inline: true,
							},
							{
								name: "Rating",
								value: `\`${data.rating}\``,
								inline: true,
							},
							{
								name: "Aired",
								value: `\`${data.aired}\``,
								inline: true,
							},
							{ name: "Score", value: `\`${data.score}\``, inline: true },
							{
								name: "Favorites",
								value: `\`${data.favorites}\``,
								inline: true,
							},
							{ name: "Ranked", value: `\`${data.ranked}\``, inline: true },
							{ name: "Duration", value: `\`${data.duration}\``, inline: true },
							{ name: "Studios", value: `\`${data.studios}\``, inline: true },
							{
								name: "Popularity",
								value: `\`${data.popularity}\``,
								inline: true,
							},
							{
								name: "Supporters",
								value: `\`${data.members}\``,
								inline: true,
							},
							{
								name: "Score Stats",
								value: `\`${data.scoreStats}\``,
								inline: true,
							},
							{ name: "Source", value: `\`${data.source}\``, inline: true },
							{
								name: "Synonyms",
								value: `\`${data.synonyms.join(", ")}\``,
								inline: true,
							},
							{ name: "Status", value: `\`${data.status}\``, inline: true },
							{ name: "Identifier", value: `\`${data.id}\`` },
						)
						.setTimestamp()
						.setFooter({
							text: `Requested by: ${interaction.user.tag}`,
							iconURL: interaction.user.displayAvatarURL({ forceStatic: true }),
						});

					const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
						new ButtonBuilder()
							.setURL(`${data.url}`)
							.setLabel(`${data.englishTitle}`)
							.setStyle(ButtonStyle.Link),
					);
					return interaction
						.editReply({
							embeds: [malEmbed],
							components: [row],
						})
						.catch((err) => {
							interaction.client.logger.info(`Anime Command Error: ${err}`);
							return interaction.editReply({
								content: `Cannot find results for ${query}, try to use it's real name if it's an abbreviation.`,
							});
						});
				});
			}
		}
	},
});
