import { CommandType } from "#lib/enums";
import { CelestineCommand } from "#lib/structures";
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

interface InsultData {
	insult: string;
}

export default new CelestineCommand({
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
			name: "topic",
			description: "Sends a question to start a topic!",
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
			case "topic": {
				let topicQ = [
					"What are the top three things on your bucket list?",
					"How do you think you will die?",
					"If you could ask for a miracle, what would it be?",
					"What is the biggest risk you’ve ever taken?",
					"What would your ideal life look like?",
					"If someone gave you an envelope with your death date inside of it, would you open it?",
					"When have you been the most happy?",
					"What is your idea of the perfect day?",
					"Do you think your priorities have changed since you were younger?",
					"What keeps you up at night?",
					"What scares you most about your future?",
					"What is the most difficult thing you’ve ever done?",
					"What does success mean to you?",
					"What makes you smile?",
					"Is there a dream you’ve always had?",
					"What gives you butterflies?",
					"What motivates you most in life?",
					"What makes you feel discouraged?",
					"What’s something not many people know about you?",
					"What are you most passionate about?",
					"Who do you text the most?",
					"What was your favorite thing to do as a kid?",
					"What’s your dream job?",
					"What is your favorite weekend activity?",
					"What makes you most uncomfortable about dating?",
					"If you could have dinner with anyone living or not, who would it be?",
					"Are you a cat person or a dog person?",
					"What is the silliest thing you’ve posted online?",
					"What was your worst wardrobe mistake?",
					"What is the best restaurant you’ve been to?",
					"What is your favorite kitchen smell?",
					"When you die, what do you want to be reincarnated as?",
					"What is your favorite guilty pleasure TV show?",
					"Who would you swap lives with for a day?",
					"If you could live anywhere in the world, where would it be?",
					"Would you prefer to live in an urban area or a rural area?",
					"What is the strangest gift you have ever received?",
					"What’s the best compliment you’ve ever received?",
					"Would you rather be invisible or have X-ray vision?",
					"If you could only save one item from a house fire, what would it be?",
					`You're house is on fire and you can only save one person do you: save your mom,dad or do you let both of them die?`,
					"If you could have picked your own name, what would it be?",
					"What time period would you travel to?",
					"What is one thing you can’t live without?",
					"What is your least favorite chore?",
					"Who are you most thankful for and why?",
					"What makes you most proud?",
					"What makes you the happiest?",
					"Who makes you the happiest?",
					"If you could be an animal, what would it be and why?",
					"If you could be any age, what age would you choose?",
					"When is the last time you laughed so hard that you cried?",
					"What did you think was the most challenging part of being a kid?",
					"If you could be any age, what age would you choose?",
					"What are you reading right now?",
					"How long can you go without checking your phone?",
					"Do you have a morning ritual?",
					"What bad habits do you wish you could stop?",
					"Are you a jealous person?",
					"If someone offered to tell you your future, would you accept it?",
					"If you were to remove one social media app from your phone, which would it be and why?",
					"If you were on death row, what would your last meal be?",
					"If you could sit down with your 13-year old self, what would you say?",
					"What makes you really angry?",
					"What’s your guilty pleasure?",
					"What bores you?",
					"If your plane was going down, who would you would call?",
					"What would you do if you were home alone and the power went out?",
					"What do you do in your free time?",
					"What do you wish you had more time for?",
					"What is your favorite movie soundtrack?",
				];
				const response = topicQ[Math.floor(Math.random() * topicQ.length)];

				const topicEmbed = new EmbedBuilder()
					.setTitle("🤔 Random Topic:")
					.addFields({
						name: "━━━━━━━━━",
						value: response,
					})
					.setColor("#00FFFF")
					.setFooter({
						text: `Requested by ${interaction.user.username}`,
						iconURL: interaction.user.displayAvatarURL(),
					})
					.setThumbnail(
						"https://cdn.discordapp.com/attachments/791309678092353536/822294803504562206/speech_ballon.gif",
					);

				return interaction.editReply({
					embeds: [topicEmbed],
				});
			}
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
					"is that even a question? yes!!",
					"is that even a question? no.",
					"talk to me later once i'm done with your mom",
					"talk to me later once i'm done with your dad",
				];
				const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

				const Embed = new EmbedBuilder()
					.setColor(0xe91e63)
					.setTitle(`${inquiry}`)
					.setDescription(`🎱 ${fortune}`)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});
				return interaction.editReply({ embeds: [Embed] });
			}
			case "dadjokes": {
				let response = await fetch(`https://icanhazdadjoke.com/slack`);
				let data = await response.text();
				const text = JSON.parse(data);
				const embed = new EmbedBuilder()
					.setTitle(`👴 | Random Dad Joke`)
					.setColor(0xe91e63)
					.setFooter({
						text: `${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					})
					.setDescription(text.attachments[0].text);
				return interaction.editReply({ embeds: [embed] });
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
					.setColor(0xe91e63);

				return interaction.editReply({ embeds: [jokeembed] });
			}
			case "meme": {
				const res = await fetch("https://meme-api.com/gimme");
				const meme = (await res.json()) as MemeData;

				const buttonUps = new ButtonBuilder()
					.setLabel(`${meme.ups} 👍`)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true)
					.setCustomId("meme");

				const memeEmbed = new EmbedBuilder()
					.setAuthor({ name: `${meme.author}` })
					.setTitle(meme.title)
					.setColor(0xe91e63)
					.setImage(meme.url)
					.setURL(meme.postLink)
					.setFooter({
						text: `Requested by ${interaction.user.tag}`,
						iconURL: `${interaction.user.displayAvatarURL({
							forceStatic: true,
						})}`,
					});
				return interaction.editReply({
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
					return interaction.editReply({
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
				return interaction.editReply({ embeds: [shipEmbed] });
			}
			case "waifu": {
				const res = await fetch(`https://api.waifu.pics/sfw/waifu`);
				const img = (await res.json()) as Waifu;
				const waifuEmbed = new EmbedBuilder()
					.setImage(img.url)
					.setColor(0xe91e63);
				return interaction.editReply({
					embeds: [waifuEmbed],
				});
			}
			case "yomama": {
				const member = interaction.options.getUser("user") || interaction.user;

				const ran = Math.floor(Math.random() * 5);

				const res = await fetch("https://api.yomomma.info");
				let joke = (await res.json()) as Joke;
				joke.joke = joke.joke.charAt(0).toLowerCase() + joke.joke.slice(1);
				if (
					!joke.joke.endsWith("!") &&
					!joke.joke.endsWith(".") &&
					!joke.joke.endsWith('"')
				)
					joke.joke += "!";

				if (member.id === interaction.client.user.id) {
					if ((ran >= 3 && ran <= 5) || ran === 0) {
						return interaction.reply({
							content: `${interaction.user.username}, ${joke} 😈`,
						});
					} else {
						return interaction.reply({
							content: `${interaction.user.username}, ${joke}`,
						});
					}
				}

				if ((ran >= 3 && ran <= 5) || ran === 0) {
					return interaction.reply({
						content: `<@${member.id}>, ${joke} 😈`,
					});
				} else {
					return interaction.reply({
						content: `<@${member.id}>, ${joke}`,
					});
				}
			}
			case "roast": {
				const roastUser = interaction.options.getUser("user");

				const response = await fetch(
					"https://evilinsult.com/generate_insult.php?lang=en&type=json",
				);

				const data = (await response.json()) as InsultData;

				if (roastUser!.id === interaction.user.id)
					return interaction.editReply({
						content:
							"You can't roast yourself you masochist! Roast another person.",
					});

				if (roastUser!.id === interaction.client.user.id)
					return interaction.editReply({
						content: `😈 ${interaction.user}, ${data.insult} `,
					});

				return interaction.editReply({
					content: `${roastUser}, ${data.insult}`,
					allowedMentions: { repliedUser: false },
				});
			}
		}
	},
});
