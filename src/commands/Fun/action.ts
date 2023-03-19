import { CommandType } from "#lib/enums";
import { HexieCommand } from "#lib/structures";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import fetch from "node-fetch";
import client from "nekos.life";
const sfw = new client();

interface Actions {
	url: string;
}
export default new HexieCommand({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Do an action to a user!",
	options: [
		{
			name: "bully",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Bully a user. ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to bully.",
					required: true,
				},
			],
		},
		{
			name: "feed",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Poke a user. ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to poke with.",
					required: true,
				},
			],
		},
		{
			name: "cuddle",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Cuddle a user. ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to cuddle with.",
					required: true,
				},
			],
		},
		{
			name: "hug",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Hug a user. ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to hug.",
					required: true,
				},
			],
		},
		{
			name: "kill",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Kill a user(For Fun). ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to Kill(For Fun).",
					required: true,
				},
			],
		},
		{
			name: "kiss",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Kiss a user. ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to Kiss.",
					required: true,
				},
			],
		},
		{
			name: "pat",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Pat a user. ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to Pat.",
					required: true,
				},
			],
		},
		{
			name: "slap",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Slap a user. ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to slap.",
					required: true,
				},
			],
		},
		{
			name: "tickle",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Tickle a user. ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to tickle.",
					required: true,
				},
			],
		},
		{
			name: "breed",
			type: ApplicationCommandOptionType.Subcommand,
			description: "breed with a user. ",
			options: [
				{
					name: "user",
					type: ApplicationCommandOptionType.User,
					description: "User you want to breed with.",
					required: true,
				},
				{
					name: "user-two",
					type: ApplicationCommandOptionType.User,
					description: "Second user you want to breed with the 1st user.",
					required: false,
				},
			],
		},
	],
	async commandRun(interaction) {
		const usertwo = interaction.options.getUser("user-two") || interaction.user;
		const Options = interaction.options.getSubcommand();
		const mentionedUser = interaction.options.getUser("user", true);
		await interaction.deferReply();
		switch (Options) {
			case "bully": {
				let slaplink = await sfw.slap();

				const res = await fetch("https://api.waifu.pics/sfw/bully");
				const img = (await res.json()) as Actions;

				const bullybot = new EmbedBuilder()

					.setTitle("Imagine trying to bully a bot")
					.setDescription(
						`**<@!${interaction.user.id}> TRIED TO BULLY WITH ME!!!**`,
					)
					.setColor(0xfde4f2)
					.setImage(slaplink.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				const bullyEmbed = new EmbedBuilder()

					.setTitle("WAAA STOP-")
					.setDescription(
						`**<@${interaction.user.id}> bullied ${mentionedUser}**`,
					)
					.setColor(0xfde4f2)
					.setImage(img.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});
				if (interaction.user.id === mentionedUser.id) {
					return interaction.editReply({
						content: "You can't bully yourself masochist!",
					});
				}

				if (mentionedUser.id === "1021374807683637249") {
					return interaction.editReply({
						embeds: [bullybot],
					});
				}

				return interaction.editReply({
					embeds: [bullyEmbed],
				});
			}
			case "cuddle": {
				let link = await sfw.cuddle();
				let slaplink = await sfw.slap();

				const cuddlebot = new EmbedBuilder()

					.setTitle("Ewwwwww get away from me")
					.setDescription(
						`**<@!${interaction.user.id}> TRIED TO CUDDLE WITH ME!!!**`,
					)
					.setColor(0xfde4f2)
					.setImage(slaplink.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				const cuddleEmbed = new EmbedBuilder()

					.setTitle("So cute!")
					.setDescription(
						`**<@${interaction.user.id}> cuddled with ${mentionedUser}**`,
					)
					.setColor(0xfde4f2)
					.setImage(link.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});
				if (interaction.user.id === mentionedUser.id) {
					return interaction.editReply({
						content: "You can't cuddle with yourself lonely person!",
					});
				}

				if (mentionedUser.id === "1021374807683637249") {
					return interaction.editReply({
						embeds: [cuddlebot],
					});
				}

				return interaction.editReply({
					embeds: [cuddleEmbed],
				});
			}
			case "hug": {
				let link = await sfw.hug();
				let slaplink = await sfw.slap();

				const hugbot = new EmbedBuilder()

					.setTitle("Ewwwwww get away from me")
					.setDescription(`**<@!${interaction.user.id}> TRIED TO HUG ME!!!**`)
					.setColor(0xfde4f2)
					.setImage(slaplink.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				const hugEmbed = new EmbedBuilder()

					.setTitle("So cute!")
					.setDescription(
						`**<@${interaction.user.id}> hugged ${mentionedUser}**`,
					)
					.setColor(0xfde4f2)
					.setImage(link.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});
				if (interaction.user.id === mentionedUser.id) {
					return interaction.editReply({
						content: "You can't hug yourself lonely person!",
					});
				}

				if (mentionedUser.id === "1021374807683637249") {
					return interaction.editReply({
						embeds: [hugbot],
					});
				}

				return interaction.editReply({
					embeds: [hugEmbed],
				});
			}
			case "kill": {
				const target = interaction.options.getUser("user")!;
				const perp = interaction.user;

				const kills = [
					`${perp} after a long day, plops down on the couch with ${target} and turns on The Big Bang Theory. After a Sheldon Cooper joke, ${target} laughs uncontrollably as they die.`,
					`${perp} Alt+F4'd ${target}.exe!`,
					`${perp} attempted to play a flute, exploding the head of ${target}.`,
					`${perp} blew his ear drums out listening to music too hard.`,
					`${perp} challenges ${target} to a fist fight to the death. ${target} wins.`,
					`${perp} cleaves the head of ${target} with a keyboard.`,
					`${perp} crushes ${target} with a fridge.`,
					`${perp} decapitates ${target} with a sword.`,
					`${perp} drags ${target}s ears too hard and rips them off.`,
					`${perp} drowns ${target} in a beer barrel.`,
					`${perp} drowns ${target} in a tub of hot chocolate. *How was your last drink?*`,
					`${perp} eviscerates ${target} with a rusty butter knife. Ouch!`,
					`${perp} feeds toothpaste-filled oreos to ${target}, who were apparently allergic to fluorine. GGWP.`,
					`${perp} fell in love with ${target} then broke his heart literally.`,
					`${perp} fires a supersonic frozen turkey at ${target}, killing them instantly.`,
					`${perp} forgot to leave the car door window open and ${target} dies from overheating`,
					`${perp} forgot to zombie-proof ${target} lawn... Looks like zombies had a feast last night.`,
					`${perp} gets ${target} to watch anime with them. ${target} couldn't handle it.`,
					`${perp} grabs ${target} and shoves them into an auto-freeze machine with some juice and sets the temperature to 100 Kelvin, creating human ice pops.`,
					`${perp} hired me to kill you, but I don't want to! ${target}`,
					`${perp} hugs ${target} too hard..`,
					`${perp} hulk smashes ${target} into a pulp.`,
					`${perp} killed ${target} by ripping the skin off of their face and making a mask out of it.`,
					`${perp} kills ${target} after hours of torture.`,
					`${perp} kills ${target} with a candlestick in the study`,
					`${perp} kills ${target} with kindness`,
					`${perp} kills ${target} with their own foot.`,
					`${perp} murders ${target} with an axe.`,
					`${perp} pressed delete. It deleted ${target}`,
					`${perp} pushes ${target} into the cold vacuum of space.`,
					`${perp} runs ${target} over with a PT Cruiser.`,
					`${perp} shoots ${target} in the head.`,
					`${perp} shoots in ${target} mouth with rainbow laser, causing ${target} head to explode with rainbows and ${target} is reborn as unicorn. :unicorn:`,
					`${perp} shot ${target} using the Starkiller Base!`,
					`${perp} slips bleach into ${target}'s lemonade.`,
					`${perp} strangles ${target}.`,
					`${perp} straps ${target} to an ICBM and sends them to North Korea along with it.`,
					`${perp} strikes ${target} with the killing curse... *Avada Kedavra!*`,
					`${perp} tears off ${target}s lips after a kiss.`,
					`${perp} thicc and collapses ${target}'s rib cage`,
					`${perp} tries to shoot the broad side of a barn, misses and hits ${target} instead.`,
					`${perp} turns on Goosebumps(2015 film) on the TV. ${target} being a scaredy-cat, dies of an heart attack.`,
					`${perp} was so swag that ${target} died due to it. #Swag`,
					`${perp}, are you sure you want to kill ${target}? They seem nice to me.`,
					`${target} accidentally clicked on a popup ad that reads \`Doctors hate us, see the one best trick for dying today!\``,
					`${target} accidentally tripped and died while getting up to write their suicide note.`,
					`${target} ate a piece of exotic butter. It was so amazing that it killed them.`,
					`${target} ate an apple and turned out it was made out of wax. Someone died from wax poisoning later that day.`,
					`${target} ate too many laxatives and drowned in their own shit. Ew.`,
					`${target} bleeds out after trying to get on \`Dumbest hillbilly moments\`.`,
					`${target} bought a fidget spinner and drowned in pussy.`,
					`${target} can't be killed, as they are a ghost.`,
					`${target} chokes in a trash can.`,
					`${target} chokes on a chicken bone.`,
					`${target} chokes on cheerios and dies. What an idiot...`,
					`${target} cranks up the music system only to realize the volume was at max and the song playing was Baby by Justin Beiber...`,
					`${target} cums in eye, goes blind, runs for help but ran straight onto train tracks and gets plowed by a train.`,
					`${target} decided it was a good idea to fight a tiger while smelling like meat. It did not end well.`,
					`${target} did not make a meme dank enough and was stoned.`,
					`${target} died after fapping 50 times in a row with no break.`,
					`${target} died after gaming for 90 hours straight without moving or eating.`,
					`${target} died after playing with an edgy razor blade fidget spinner.`,
					`${target} died after realizing how shitty their grammar was`,
					`${target} died after trying to out-meme Dank Memer.`,
					`${target} died an honorable death. Death by snoo snoo.`,
					`${target} died because RemindMeBot forgot to remind them to breathe`,
					`${target} died because they started playing with a fidget spinner but they realise its 2016 so you start fapping to the old witch in snow white and obama starts mowing their lawn and they jump out of the window and get ripped to pieces by Obama's lawn mower`,
					`${target} died due to ${perp} being so stupid`,
					`${target} died due to eating WAY too many hotdogs in preparation for their date Friday night.`,
					`${target} died eating expired and infected raw fish with the filthiest rice in the world as sushi while being constantly stabbed in the scrotum with a 9inch nail sharp enough to stab through kevlar. The soy sauce was cat piss.`,
					`${target} died from a high salt intake`,
					`${target} died from a swift kick to the brain.`,
					`${target} died from a tragic amount of bad succ`,
					`${target} died from doing the ice bucket challenge.`,
					`${target} died from drinking too much water Huh, I guess it IS possible!.`,
					`${target} died from eating cactus needles.`,
					`${target} died from eating too much ass.`,
					`${target} died from eating too much bread :/`,
					`${target} died from ebola.`,
					`${target} died from meme underdose :/`,
					`${target} died from not eating enough ass.`,
					`${target} died from not whacking it enough. (There's a healthy balance, boys)`,
					`${target} died from reposting in the wrong neighborhood`,
					`${target} died from shitting for 36 hours straight.`,
					`${target} died from swallowing rocks too fast`,
					`${target} died from too many sunburns.`,
					`${target} died from whacking it too much. (There's a healthy balance, boys)`,
					`${target} died of oversucc`,
					`${target} died when testing a hydrogen bomb. There is nothing left to bury.`,
					`${target} died while listening to 'It's every day bro'`,
					`${target} died while playing hopscotch on *seemingly* deactivated land mines.`,
					`${target} died while trying to find the city of England`,
					`${target} died. OOF`,
					`${target} dies after swallowing a toothpick.`,
					`${target} dies at the hands of ${perp}.`,
					`${target} dies because they used a bobby pin to lift their eyelashes`,
					`${target} dies because they were just too angry.`,
					`${target} dies by swearing on a Christian Minecraft server`,
					`${target} dies due to lack of friends.`,
					`${target} dies from bad succ.`,
					`${target} dies from dabbing too hard.`,
					`${target} dies from dabbing too hard`,
					`${target} dies from disrespecting wahmen.`,
					`${target} dies from just being a bad, un-likeable dude.`,
					`${target} dies from posting normie memes.`,
					`${target} dies from severe dislike of sand. It's coarse and rough and irritating it gets everywhere`,
					`${target} dies from watching the emoji movie and enjoying it.`,
					`${target} dies in a horrible accident, and it was engineered by ${perp}.`,
					`${target} dies north of the wall and transforms into a white walker`,
					`${target} dies of AIDS.`,
					`${target} dies of dysentery.`,
					`${target} dies of natural causes.`,
					`${target} dies of starvation.`,
					`${target} dies on death row via lethal injection after murdering ${perp} and their family.`,
					`${target} dies, but don't let this distract you from the fact that in 1998, The Undertaker threw Mankind off Hell In A Cell, and plummeted 16 ft through an announcer’s table`,
					`${target} dies.`,
					`After a struggle, ${target} kills ${perp}`,
					`${target} disappeared from the universe.`,
					`${target} drank some toxic soda before it was recalled.`,
					`${target} dropped a Nokia phone on their face and split their skull.`,
					`${target} drowned in their own tears.`,
					`${target} eats too much copypasta and explodes`,
					`${target} fell down a cliff while playing Pokemon Go. Good job on keeping your nose in that puny phone. :iphone:`,
					`${target} fell into a pit of angry feminists.`,
					`${target} gets hit by a car.`,
					`${target} gets stabbed by ${perp}`,
					`${target} gets struck by lightning.`,
					`${target} goes genocide and Sans totally dunks ${target}!`,
					`${target} got into a knife fight with the pope. One of them is in hell now.`,
					`${target} got stepped on by an elephant.`,
					`${target} died from eating too much ass.`,
					`${target} has a stroke after a sad miserable existence. They are then devoured by their ample cats.`,
					`${target} has been found guilty, time for their execution!`,
					`${target} has some bad chinese food, and pays the ultimate price.`,
					`${target} is abducted by aliens, and the government kills them to cover it up.`,
					`${target} is dead at the hands of ${perp}.`,
					`${target} is injected with chocolate syrup, which mutates them into a person made out of chocolate. While doing a part-time job at the Daycare, they are devoured by the hungry babies. :chocolate_bar:`,
					`${target} is killed by a rabbit with a vicious streak a mile wide`,
					`${target} is killed by their own stupidity.`,
					`${target} is killed in a robbery gone wrong.`,
					`${target} is not able to be killed. Oh, wait, no, ${perp} kills them anyway.`,
					`${target} is so dumb that they choked on oxygen.`,
					`${target} is stuffed into a suit by Freddy on their night guard duty. Oh, not those animatronics again!`,
					`${target} is sucked into Minecraft. ${target}, being a noob at the so called Real-Life Minecraft faces the Game Over screen.`,
					`${target} killed themselves after seeing the normie memes that ${perp} posts.`,
					`${target} kills themselves after realizing how dumb ${perp} is.`,
					`${target} lives, despite ${perp}'s murder attempt.`,
					`${target} loses the will to live`,
					`${target} presses a random button and is teleported to the height of 100m, allowing them to fall to their inevitable death. Moral of the story: Don't go around pressing random buttons.`,
					`${target} reads memes till they die.`,
					`${target} ripped his heart out..`,
					`${target} ripped their own heart out to show their love for ${perp}.`,
					`${target} screams in terror as they accidentally spawn in the cthulhu while uttering random latin words. Cthulhu grabs ${target} by the right leg and takes them to his dimension yelling, \`Honey, Dinner's ready!\``,
					`${target} slipped in the bathroom and choked on the shower curtain.`,
					`${target} slips on a banana peel and falls down the stairs.`,
					`${target} spins a fidget spinner and when it stops he dies...`,
					`${target} steps on a george foreman and dies of waffle foot.`,
					`${target} takes an arrow to the knee. And everywhere else.`,
					`${target} talked back to mods and got destroyed by the ban hammer.`,
					`${target} tips his fedora too far and falls onto the tracks of an oncoming subway.`,
					`${target} tried to get crafty, but they accidentally cut themselves with the scissors.:scissors:`,
					`${target} tried to get famous on YouTube by live-streaming something dumb. Skydiving while chained to a fridge.`,
					`${target} tried to outrun a train, the train won.`,
					`${target} tried to pick out the holy grail. He chose... poorly.`,
					`${target} tried to play in the street...`,
					`${target} trips over his own shoe laces and dies.`,
					`${target} vocally opposed the Clintons and then suddenly disappeared.`,
					`${target} was a resident of Alderaan before Darth Vader destroyed the planet...`,
					`${target} was accused of stealing Neptune's crown...`,
					`${target} was charging their Samsung Galaxy Note 7...`,
					`${target} was eaten alive by ants`,
					`${target} was given a chance to synthesize element 119 (Ununennium) and have it named after them, but they messed up. R.I.P.`,
					`${target} was killed by ${perp} with baby wipes.`,
					`${target} was murdered by ${perp} and everyone knows it, but there is no proof.`,
					`${target} was scooped by ${perp} and their innards are now Ennard.`,
					`${target} was teleported to the timeline where Jurassic World was real and they were eaten alive by the Indominus Rex.`,
					`${target} was thrown in the crusher of a trash truck by ${perp}.`,
					`${target} was walking normally when out of the corner of their eye they saw someone do a bottle flip and dab causing ${target} to have a stroke.`,
					`${target} watched the Emoji Movie and died of sheer cringe.`,
					`${target} went on a ride with a lead balloon.`,
					`After getting pushed into the ocean by ${perp}, ${target} is eaten by a shark.`,
					`After raid of roblox kids entered the server, ${target} died of cancer.`,
					`Aids, ${target} died from aids.`,
					`Calling upon the divine powers, ${perp} smites ${target} and their heathen ways`,
					`In a sudden turn of events, I **don't** kill ${target}.`,
					`no u`,
					`Our lord and savior Gaben strikes ${target} with a lighting bolt.`,
					`Sorry, ${perp}, I don't like killing people.`,
					`The bullet missed Harambe and hit ${target} instead. Yay for Harambe!`,
					`While performing colonoscopy on an elephant, ${target} gets their head stuck in the elephants rectum and chokes.`,
					`${target} watched a female comedian`,
					`Jett couldnt revive ${target}`,
					`${target}'s elytra broke`,
					`${target} forgot their water bucket`,
					`${target} bullied the quiet kid`,
					`${target} fought the blue-haired girl`,
					`${target} had america's oil`,
					`${target} found the cure for cancer, the next day they magically disappeared`,
					`${target} cancelled their subscription for living`,
					`${target} died from AIDS...`,
					`${target} died waiting for Hexie to have good commands`,
					`${target} was eaten by the duolingo owl...`,
					`${target} killed their snapstreak with ${perp} causing ${interaction.user.tag} to get really angry at them then they shot them twice`,
					`${target} missed their duolingo spanish lessons...`,
					`${target} died from a heartbreak after being rejected by their crush ${interaction.user.tag}`,
					`${target} got dunk'd on by a fortnite kid cranking 90s`,
					`${target} choked on their own saliva`,
					`${target} died from a botched boob job`,
					`${target} was stabbed by ${perp} after they called their mom fat`,
					`${perp} dropped a nokia phone on ${target}`,
					`${target} choked on..... water`,
					`${target} died from loneliness`,
					`${target} got dabbed on for being a hater`,
					`${target} tripped on nothing and died`,
					`${target} killed themselves after ${perp} showed them some unfunny memes`,
					`${perp} tried to kill ${target} but failed`,
					`${target} used bots in general`,
					`${target} sent NSFW in general!`,
					`${target} talked back to their mom`,
					`${target} said a no no word in a Christian Minecraft server`,
					`${target} got a stroke after watching jake paul`,
					`${target} killed themselves after getting cheated on by ${interaction.user.username}`,
					`${target} was blown up by a creeper`,
					`${perp} tried to kill ${target} but ${target} shot ${perp} twice`,
					`${target} was ran over by ${perp}`,
					`${target} got into an argument with an angry feminist`,
					`${target} default danced to death`,
					`${target} drowned`,
					`${target} drowned after being pushed into the water by ${interaction.user.username}`,
				];

				if (target.id === interaction.user.id) {
					return interaction.editReply({
						content: "Do you need help?",
					});
				}
				if (target.id === "1021374807683637249") {
					return interaction.editReply({
						content: "What are you trying to do, screw off.",
					});
				}
				return interaction.editReply({
					content: `${kills[Math.floor(Math.random() * kills.length)]}`,
					allowedMentions: { repliedUser: false },
				});
			}
			case "kiss": {
				let link = await sfw.kiss();
				let slaplink = await sfw.slap();

				const kissbot = new EmbedBuilder()

					.setTitle("Ewwwwww get away from me")
					.setDescription(`**<@!${interaction.user.id}> TRIED TO KISS ME!!!**`)
					.setColor(0xfde4f2)
					.setImage(slaplink.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				const kissEmbed = new EmbedBuilder()

					.setTitle("So cute!")
					.setDescription(
						`**<@${interaction.user.id}> kissed ${mentionedUser}**`,
					)
					.setColor(0xfde4f2)
					.setImage(link.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});
				if (interaction.user.id === mentionedUser.id) {
					return interaction.editReply({
						content: "You can't kiss yourself lonely person!",
					});
				}

				if (mentionedUser.id === "1021374807683637249") {
					return interaction.editReply({
						embeds: [kissbot],
					});
				}

				return interaction.editReply({
					embeds: [kissEmbed],
				});
			}
			case "pat": {
				let link = await sfw.pat();
				let slaplink = await sfw.slap();

				const patbot = new EmbedBuilder()

					.setTitle("Ewwwwww get away from me")
					.setDescription(`**<@!${interaction.user.id}> TRIED TO PAT ME!!!**`)
					.setColor(0xfde4f2)
					.setImage(slaplink.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				const patEmbed = new EmbedBuilder()

					.setTitle("So adorable!")
					.setDescription(`**<@${interaction.user.id}> pat ${mentionedUser}**`)
					.setColor(0xfde4f2)
					.setImage(link.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});
				if (interaction.user.id === mentionedUser.id) {
					return interaction.editReply({
						content: "You can't pat yourself lonely person!",
					});
				}

				if (mentionedUser.id === "1021374807683637249") {
					return interaction.editReply({
						embeds: [patbot],
					});
				}

				return interaction.editReply({
					embeds: [patEmbed],
				});
			}
			case "slap": {
				let link = await sfw.slap();

				const slapbot = new EmbedBuilder()

					.setTitle("Imagine trying to slap metal.")
					.setDescription(`**<@!${interaction.user.id}> TRIED TO SLAP ME!!!**`)
					.setColor(0xfde4f2)
					.setImage(link.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				const slapEmbed = new EmbedBuilder()

					.setTitle("BRUTAL!")
					.setDescription(
						`**<@${interaction.user.id}> slapped ${mentionedUser}**`,
					)
					.setColor(0xfde4f2)
					.setImage(link.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});
				if (interaction.user.id === mentionedUser.id) {
					return interaction.editReply({
						content: "You can't slap yourself you masochist!",
					});
				}

				if (mentionedUser.id === "1021374807683637249") {
					return interaction.editReply({
						embeds: [slapbot],
					});
				}

				return interaction.editReply({
					embeds: [slapEmbed],
				});
			}
			case "tickle": {
				let link = await sfw.tickle();
				let slaplink = await sfw.slap();

				const tickleBot = new EmbedBuilder()

					.setTitle("HaHaAHHA STOP-")
					.setDescription(
						`**<@!${interaction.user.id}> TRIED TO TICKLE ME!!!**`,
					)
					.setColor(0xfde4f2)
					.setImage(slaplink.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				const tickleEmbed = new EmbedBuilder()

					.setTitle("So ticklish!")
					.setDescription(
						`**<@${interaction.user.id}> tickled ${mentionedUser}**`,
					)
					.setColor(0xfde4f2)
					.setImage(link.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});
				if (interaction.user.id === mentionedUser.id) {
					return interaction.editReply({
						content: "You can't tickle yourself you masochist!",
					});
				}

				if (mentionedUser.id === "1021374807683637249") {
					return interaction.editReply({
						embeds: [tickleBot],
					});
				}

				return interaction.editReply({
					embeds: [tickleEmbed],
				});
			}
			case "breed": {
				const baby = interaction.guild!.members.cache.random();

				if (mentionedUser.id === interaction.user.id)
					return interaction.editReply({
						content: "You can't breed with yourself you dumb fuck.",
					});

				const breedEmbed = new EmbedBuilder()
					.setTitle("💞 | Breeding!")
					.setDescription(
						`🔻 | ${mentionedUser} \n🔺| and ${usertwo} bred with each other!`,
					)
					.setColor("#ff007f")
					.addFields({
						name: "👶 | Breeding Result",
						value: `They bred for a long time and made ${baby}.`,
					})
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});
				return interaction.editReply({ embeds: [breedEmbed] });
			}
			case "feed": {
				let datas = await sfw.feed();

				let slapLink = await sfw.slap();

				const feedBot = new EmbedBuilder()

					.setTitle("EH!?")
					.setDescription(
						`**<@!${interaction.user.id}> TRIED TO FEED ME EVEN THO I CAN EAT BY MYSELF!!!**`,
					)
					.setColor(0xfde4f2)
					.setImage(slapLink.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				const feedEmbed = new EmbedBuilder()

					.setTitle("Feeding!")
					.setDescription(`**<@${interaction.user.id}> fed ${mentionedUser}**`)
					.setColor(0xfde4f2)
					.setImage(datas.url)
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL(),
					});

				if (interaction.user.id === "1021374807683637249") {
					return interaction.editReply({ embeds: [feedBot] });
				}
				if (interaction.user.id === mentionedUser.id) {
					return interaction.editReply({
						content: "You can't feed yourself you lonely person!",
					});
				}

				return interaction.editReply({ embeds: [feedEmbed] });
			}
		}
	},
});
