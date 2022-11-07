import { Command } from "#lib/structures";
import fetch from "node-fetch";
import { CommandType } from "#lib/enums";
import { ApplicationCommandOptionType, AttachmentBuilder } from "discord.js";

export default new Command({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Manipulate images!",
	options: [
		{
			name: "drake",
			description: "Manipulate a drake image.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "yes-text",
					description: "Text that drake likes.",
					type: ApplicationCommandOptionType.String,
					required: true,
					min_length: 1,
					max_length: 256,
				},
				{
					name: "no-text",
					description: "Text that drake likes.",
					type: ApplicationCommandOptionType.String,
					required: true,
					min_length: 1,
					max_length: 256,
				},
			],
		},
		{
			name: "panik-kalm-panik",
			description: "Manipulate a panik-kalm-panik image.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "panik",
					description: "1st text to panik about.",
					type: ApplicationCommandOptionType.String,
					required: true,
					min_length: 1,
					max_length: 256,
				},
				{
					name: "kalm",
					description: "1st text to be kalm about.",
					type: ApplicationCommandOptionType.String,
					required: true,
					min_length: 1,
					max_length: 256,
				},
				{
					name: "panik2",
					description: "2nd text to panik about.",
					type: ApplicationCommandOptionType.String,
					required: true,
					min_length: 1,
					max_length: 256,
				},
			],
		},
		{
			name: "gay",
			description: "Turn someone gay.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "user",
					description: "User to turn gay.",
					type: ApplicationCommandOptionType.User,
					required: false,
				},
				{
					name: "image",
					description: "Image to turn gay.",
					type: ApplicationCommandOptionType.Attachment,
					required: false,
				},
			],
		},
		{
			name: "pixelate",
			description: "Pixelate someones avatar.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "user",
					description: "User to pixelate their avatar.",
					type: ApplicationCommandOptionType.User,
					required: false,
				},
				{
					name: "image",
					description: "Image to pixelate.",
					type: ApplicationCommandOptionType.Attachment,
					required: false,
				},
			],
		},
		{
			name: "burn",
			description: "Make spongebob burn a text.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "text",
					description: "Text to burn.",
					type: ApplicationCommandOptionType.String,
					required: true,
					min_length: 1,
					max_length: 256,
				},
			],
		},
		{
			name: "caution",
			description: "CAUTION NO BITCHES!",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "text",
					description: "Text to caution.",
					type: ApplicationCommandOptionType.String,
					required: true,
					min_length: 1,
					max_length: 256,
				},
			],
		},
		{
			name: "eddyfact",
			description: "Eddy this is a fact book meme",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "text",
					description: "Text to fact.",
					required: true,
					type: ApplicationCommandOptionType.String,
					min_length: 1,
					max_length: 256,
				},
			],
		},
		{
			name: "shit",
			description: "Ew I stepped on a shit.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "user",
					description: "User to shit on.",
					type: ApplicationCommandOptionType.User,
					required: false,
				},
				{
					name: "image",
					description: "Image to shit on.",
					type: ApplicationCommandOptionType.Attachment,
					required: false,
				},
			],
		},
	],
	async commandRun(interaction) {
		await interaction.deferReply();
		const Types = interaction.options.getSubcommand();
		const drakeYes = interaction.options.getString("yes-text");
		const drakeNo = interaction.options.getString("no-text");
		const text = interaction.options.getString("text");
		const user = interaction.options.getUser("user") || interaction.user;
		const panik = interaction.options.getString("panik");
		const kalm = interaction.options.getString("kalm");
		const panik2 = interaction.options.getString("panik2");
		const attachment = interaction.options.getAttachment("image");

		switch (Types) {
			case "drake": {
				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/drake?yes=${encodeURIComponent(
						drakeYes!,
					)}&no=${encodeURIComponent(drakeNo!)}`,
				).then((response) => (image = response.url));

				const finalImage = new AttachmentBuilder(image, { name: "drake.png" });

				return interaction.followUp({ files: [finalImage] });
			}
			case "panik-kalm-panik": {
				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/panik-kalm-panik?panik=${encodeURIComponent(
						panik!,
					)}&kalm=${encodeURIComponent(kalm!)}&panik2=${encodeURIComponent(
						panik2!,
					)}`,
				).then((response) => (image = response.url));

				const finalImage = new AttachmentBuilder(image, {
					name: "panik-kalm-panik.png",
				});

				return interaction.followUp({ files: [finalImage] });
			}
			case "gay": {
				let image;

				if (attachment) image = attachment;
				else if (!attachment)
					image = user.displayAvatarURL({
						extension: "png",
						size: 2048,
					});

				if (image === attachment) {
					if (!attachment.contentType?.includes("image"))
						return interaction.followUp({
							content:
								"The file provided is not a correct image file with the correct extension\nSupported extensions: `png` and `jpg`",
							ephemeral: true,
						});

					if (
						!attachment.contentType.includes("png") &&
						!attachment.contentType.includes("jpg") &&
						!attachment.contentType.includes("jpeg") &&
						!attachment.url.includes("jpg") &&
						!attachment.url.includes("png")
					)
						return interaction.reply({
							content:
								"The file provided is not a correct image file with the correct extension\nSupported extensions: `png` and `jpg`",
							ephemeral: true,
						});

					image = attachment.url;
				}

				image = await fetch(
					`https://luminabot.xyz/api/image/gay?image=${image}`,
				).then((response) => (image = response.url));

				const finalImage = new AttachmentBuilder(image, {
					name: "gay.png",
				});

				return interaction.followUp({ files: [finalImage] });
			}
			case "burn": {
				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/burn?text=${encodeURIComponent(
						text!,
					)}`,
				).then((response) => (image = response.url));

				const finalImage = new AttachmentBuilder(image, { name: "burn.png" });

				return interaction.followUp({ files: [finalImage] });
			}
			case "caution": {
				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/caution?text=${encodeURIComponent(
						text!,
					)}`,
				).then((response) => (image = response.url));

				const finalImage = new AttachmentBuilder(image, {
					name: "caution.png",
				});

				return interaction.followUp({ files: [finalImage] });
			}
			case "pixelate": {
				let image;

				if (attachment) image = attachment;
				else if (!attachment)
					image = user.displayAvatarURL({
						extension: "png",
						size: 2048,
					});

				if (image === attachment) {
					if (!attachment.contentType?.includes("image"))
						return interaction.followUp({
							content:
								"The file provided is not a correct image file with the correct extension\nSupported extensions: `png` and `jpg`",
							ephemeral: true,
						});

					if (
						!attachment.contentType.includes("png") &&
						!attachment.contentType.includes("jpg") &&
						!attachment.contentType.includes("jpeg") &&
						!attachment.url.includes("jpg") &&
						!attachment.url.includes("png")
					)
						return interaction.reply({
							content:
								"The file provided is not a correct image file with the correct extension\nSupported extensions: `png` and `jpg`",
							ephemeral: true,
						});

					image = attachment.url;
				}

				image = await fetch(
					`https://some-random-api.ml/canvas/misc/pixelate?avatar=${image}`,
				).then((response) => (image = response.url));

				const finalImage = new AttachmentBuilder(image, {
					name: "pixelated.png",
				});

				return interaction.followUp({ files: [finalImage] });
			}
			case "eddyfact": {
				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/edd-fact?text=${text}`,
				).then((response) => (image = response.url));

				const finalImage = new AttachmentBuilder(image, {
					name: "eddyfact.png",
				});

				return interaction.followUp({ files: [finalImage] });
			}
			case "shit": {
				let image;

				if (attachment) image = attachment;
				else if (!attachment)
					image = user.displayAvatarURL({
						extension: "png",
						size: 2048,
					});

				if (image === attachment) {
					if (!attachment.contentType?.includes("image"))
						return interaction.followUp({
							content:
								"The file provided is not a correct image file with the correct extension\nSupported extensions: `png` and `jpg`",
							ephemeral: true,
						});

					if (
						!attachment.contentType.includes("png") &&
						!attachment.contentType.includes("jpg") &&
						!attachment.contentType.includes("jpeg") &&
						!attachment.url.includes("jpg") &&
						!attachment.url.includes("png")
					)
						return interaction.reply({
							content:
								"The file provided is not a correct image file with the correct extension\nSupported extensions: `png` and `jpg`",
							ephemeral: true,
						});

					image = attachment.url;
				}

				image = await fetch(
					`https://luminabot.xyz/api/image/steppedinshit?image=${image}`,
				).then((response) => (image = response.url));

				const finalImage = new AttachmentBuilder(image, {
					name: "shit.png",
				});

				return interaction.followUp({ files: [finalImage] });
			}
		}
	},
});
