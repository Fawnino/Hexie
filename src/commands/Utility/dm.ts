import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { ApplicationCommandOptionType } from "discord.js";

export default new CelestineCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "DM a user.",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "User to dm.",
			required: true,
		},
		{
			name: "message",
			description: "Message to dm the user.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	async commandRun(interaction) {
		const user = interaction.options.getUser("user", true);
		const message = interaction.options!.getString("message");

		const susShit = [
			"ISuckSoManyDaddysOff",
			"ILoveFeet",
			"StepBroWhatAreYouDoing",
			"ISuckDick",
			"ILoveBigFatDaddies",
			"ImGonnaFuckYouToSleep",
			"ImHidingUnderYourBed",
			"LetsFuckBro",
			"1234ILoveCock",
			"IShitMyPantsInSchool",
			"IPissedMyself",
			"ILikeFuckingMyself",
			"MasturbatingIsLife",
			"ILovePenis",
			"Pussy",
			"Cock",
			"Dick",
			"ILoveFappingToMyself",
			"ImSoHot",
			"ILoveCheckingMyselfOut",
			"ILoveLittleKids",
			"IWannaFuckLopunny",
			"IWannaFuckGardevoir",
			"QueenElizabeth",
			"KingPhilipp",
			"GayTransexual",
			"YourAverageHomosexualFurry",
		];

		if (user.id === interaction.client.user.id) {
			return await interaction
				.reply({
					content: "I can't DM myself, DM an actual person!",
					ephemeral: true,
				})
				.catch((err) => {
					interaction.client.logger.error(
						`Lmao a bozo tried to dm me using the dm command`,
					);
				});
		}

		user
			.send(
				`Anonymous Message from ${Math.floor(Math.random() * susShit.length)}#${
					interaction.user.discriminator
				}: ${message}`,
			)
			.catch(async (err) => {
				interaction.client.logger.error(`DM Error: ${err}`);

				return await interaction
					.reply({
						content: `❌ | Failed to send that message, please try again`,
					})
					.catch((err) => {
						interaction.client.logger.error(`DM Command Error: ${err}`);
					});
			});

		await interaction
			.reply({
				content: `📨 | **${message}** successsfully sent to **${user}**!`,
				ephemeral: true,
			})
			.catch((err) => {
				interaction.client.logger.error(`DM Command Error: ${err}`);
			});
	},
});
