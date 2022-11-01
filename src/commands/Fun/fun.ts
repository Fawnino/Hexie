import { CommandType } from "#lib/enums";
import { Command } from "#lib/structures";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
} from "discord.js";
import fetch from "node-fetch";
import redditImageFetcher from "reddit-image-fetcher";

interface Joke {
	joke: string;
}

interface Image {
	image: string;
}

interface MemeData {
	url: string;
	title: string;
	postLink: string;
	ups: number;
	author: string;
}

interface Waifu {
	url: string;
}

interface AdviceData {
	slip: AdviceScript;
}
interface AdviceScript {
	advice: string;
}
interface AnimeQuotesData {
	character: string;
	sentence: string;
	anime: string;
}

interface InsultData {
	insult: string;
}

export default new Command({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Fun Commands!",
	options: [
		{
			name: "8ball",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Ask the magic 8ball a question.",
			options: [
				{
					name: "question",
					description: "The question you want to ask the magic 8ball.",
					required: true,
					type: ApplicationCommandOptionType.String,
				},
			],
		},
		{
			name: "dadjokes",
			description: "Get a random dad joke!",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "jokes",
			description: "Sends a random joke!",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "meme",
			description: "Get a random meme!",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "ship",
			description: "Ship two people together!",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.String,
					required: true,
					description: "The user you want to ship.",
				},
				{
					name: "user-two",
					type: ApplicationCommandOptionType.String,
					required: false,
					description: "Second user you want to ship.",
				},
			],
		},
		{
			name: "waifu",
			description: "Sends a random waifu.",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "yomama",
			type: ApplicationCommandOptionType.Subcommand,
			description:
				"Yo mama so stupid she had her kid look at the command description.",
			options: [
				{
					name: "user",
					description: "User to do the ultimate troll on 😈.",
					required: false,
					type: ApplicationCommandOptionType.User,
				},
			],
		},
		{
			name: "tsukki",
			description: "Get a random furry picture.",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "advice",
			description: "Get random advice that can hopefully help you.",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "aniquote",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Get a random anime quote!",
		},
		{
			name: "roast",
			description: "Insult and roast someone to their grave.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "user",
					description: "User to roast and insult.",
					type: ApplicationCommandOptionType.User,
					required: true,
				},
			],
		},
	],
	async commandRun(interaction) {
		const Types = interaction.options.getSubcommand();
		const inquiry = interaction.options.getString("question");
		if (!interaction.deferred) await interaction.deferReply();

		switch (Types) {
			case "8ball": {
				const fortunes = [
					"yep!",
					"i guess",
					"probably not",
					"YES YES YES!!!11",
					"hell no",
					"um.. what?",
					"sorry, say again?",
					"what is that",
					"you know what just ask someone else",
					"i mean sure, if you believe",
					"without doubt",
					"without doubt... no",
					"sorry son",
					"possibly",
					"in one universe out of 9876567... yes",
					"in one universe out of 9876567... no",
					"yes.",
					"is that a question? yes!!",
					"is that a question? no.",
					"talk to me later once i'm done with your mom",
					"talk to me later once i'm done with your dad",
				];
				const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

				const Embed = new EmbedBuilder()
					.setColor(0x5865f2)
					.setTitle(`${inquiry}`)
					.setDescription(`🎱 ${fortune}`)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});
				return interaction.followUp({ embeds: [Embed] });
			}
			case "dadjokes": {
				let response = await fetch(`https://icanhazdadjoke.com/slack`);
				let data = await response.text();
				const text = JSON.parse(data);
				const embed = new EmbedBuilder()
					.setTitle(`👴 | Random Dad Joke`)
					.setColor(0x36393f)
					.setFooter({
						text: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setDescription(text.attachments[0].text);
				return interaction.followUp({ embeds: [embed] });
			}
			case "jokes": {
				const res = await fetch("https://some-random-api.ml/joke");
				const joke = (await res.json()) as Joke;

				const jokeembed = new EmbedBuilder()
					.setTitle("😂 | Here's your random joke!")
					.setDescription(joke.joke)
					.setFooter({
						text: `Requested by ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setColor(0x36393f);

				return interaction.followUp({ embeds: [jokeembed] });
			}
			case "meme": {
				const res = await fetch("https://meme-api.herokuapp.com/gimme");
				const meme = (await res.json()) as MemeData;

				const buttonUps = new ButtonBuilder()
					.setLabel(`${meme.ups} 👍`)
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true)
					.setCustomId("meme");

				const memeEmbed = new EmbedBuilder()
					.setAuthor({ name: `${meme.author}` })
					.setTitle(meme.title)
					.setColor(0x5865f2)
					.setImage(meme.url)
					.setURL(meme.postLink)
					.setFooter({
						text: `Requested by ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});
				return interaction.followUp({
					embeds: [memeEmbed],
					components: [
						new ActionRowBuilder<ButtonBuilder>().addComponents(buttonUps),
					],
				});
			}
			case "ship": {
				const shipTarget1 = interaction.options.getString("user");
				const shipTarget2 =
					interaction.options.getString("user-two") || interaction.user;

				if (shipTarget1?.includes("<@1021374807683637249>"))
					return interaction.followUp({
						content: "Sorry I'm not interested in dating, Try someone else!",
					});

				const shipEmbed = new EmbedBuilder()
					.setTitle("💞 | MatchMaking")
					.setDescription(`🔻 | ${shipTarget1} \n🔺 | ${shipTarget2}`)
					.setColor("#ff007f")
					.addFields({
						name: "MatchMaking Result",
						value: `Their love-score is ${Math.floor(
							Math.random() * 100,
						)}%! 💘`,
					})
					.setFooter({
						text: `They call me cupid 💘`,
						iconURL: interaction.user.displayAvatarURL(),
					});
				return interaction.followUp({ embeds: [shipEmbed] });
			}
			case "waifu": {
				const res = await fetch(`https://api.waifu.pics/sfw/waifu`);
				const img = (await res.json()) as Waifu;
				const waifuEmbed = new EmbedBuilder()
					.setImage(img.url)
					.setColor(0x5865f2);
				return interaction.followUp({
					embeds: [waifuEmbed],
				});
			}
			case "yomama": {
				const member = interaction.options.getUser("user") || interaction.user;

				const res = await fetch("https://api.yomomma.info");
				let joke = (await res.json()) as Joke;

				if (member.id === interaction.client.user.id) {
					return interaction.followUp({
						content: `<@${interaction.user.id}>, ${joke.joke} 😈`,
						allowedMentions: { repliedUser: false },
					});
				} else {
					return interaction.followUp({
						content: `<@${member.id}>, ${joke.joke}`,
						allowedMentions: { repliedUser: false },
					});
				}
			}
			case "tsukki": {
				let data = (await redditImageFetcher.fetch({
					type: "custom",
					total: 1,
					subreddit: ["furry"],
				})) as Image[];
				const furryEmbed = new EmbedBuilder()
					.setImage(`${data[0].image}`)
					.setColor(0x5865f2);
				return interaction.followUp({
					embeds: [furryEmbed],
				});
			}
			case "advice": {
				const response = await fetch("https://api.adviceslip.com/advice");
				const adviceTxt = (await response.json()) as AdviceData;

				const adviceEmbed = new EmbedBuilder()
					.setDescription(`*${adviceTxt.slip.advice}*`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [adviceEmbed] });
			}
			case "aniquote": {
				const response = await fetch(`https://some-random-api.ml/animu/quote`);
				const animeQuoteTxt = (await response.json()) as AnimeQuotesData;

				const animeQuotes = new EmbedBuilder()
					.setColor("Random")
					.setDescription(`"${animeQuoteTxt.sentence}"`)
					.addFields(
						{
							name: "Anime",
							value: `${animeQuoteTxt.anime}`,
							inline: true,
						},
						{
							name: "Character",
							value: `${animeQuoteTxt.character}`,
							inline: true,
						},
					);
				return interaction.followUp({ embeds: [animeQuotes] });
			}
			case "roast": {
				const roastUser = interaction.options.getUser("user");

				const response = await fetch(
					"https://evilinsult.com/generate_insult.php?lang=en&type=json",
				);

				const data = (await response.json()) as InsultData;

				if (roastUser!.id === interaction.user.id)
					return interaction.followUp({
						content:
							"You can't roast yourself you masochist! Roast another person.",
					});

				return interaction.followUp({
					content: `${roastUser}, ${data.insult}`,
				});
			}
			case "anime-trivia": {
			}
		}
	},
});
