import { HexieCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	EmbedBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ButtonStyle,
} from "discord.js";

export default new HexieCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Emoji Configuration.",
	options: [
		{
			name: "add",
			description: "Add an emoji!",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "emoji-name",
					description: "The name of the emoji",
					type: ApplicationCommandOptionType.String,
					required: true,
					minLength: 2,
					maxLength: 32,
				},
				{
					name: "emoji-url",
					description:
						"An image URL for the emoji || If attachment is used, attachment will be used instead",
					type: ApplicationCommandOptionType.String,
				},
				{
					name: "emoji-attachment",
					description: "An attachment for the emoji || Will always be used",
					type: ApplicationCommandOptionType.Attachment,
				},
			],
		},
	],
	async commandRun(interaction) {
		await interaction.deferReply();
		const Types = interaction.options.getSubcommand();
		const emojiName = interaction.options.getString("emoji-name", true);
		const emojiURL = interaction.options.getString("emoji-url");
		const emojiAttachment =
			interaction.options.getAttachment("emoji-attachment");

		switch (Types) {
			case "add": {
				let addedEmoji: string;

				if (!emojiURL && !emojiAttachment)
					return interaction.followUp({
						content:
							"You must specify at least `emoji-url` or `emoji-attachment`.",
						ephemeral: true,
					});

				if (emojiURL && emojiAttachment) addedEmoji = emojiAttachment.url;
				else if (emojiURL && !emojiAttachment) addedEmoji = emojiURL;
				else if (emojiAttachment && !emojiURL) addedEmoji = emojiAttachment.url;
				else
					return interaction.followUp({
						content:
							"You must specify at least `emoji-url` or `emoji-attachment`.",
						ephemeral: true,
					});

				const imageURLRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

				if (addedEmoji === emojiURL) {
					if (!imageURLRegex.test(addedEmoji))
						return interaction.followUp({
							content:
								"The URL provided has been flagged as an invalid image URL\n⤷Make sure the URL fits the following format: `https://example.com/image.png`",
							ephemeral: true,
						});
					addedEmoji = addedEmoji;
				}

				if (emojiAttachment) {
					if (!emojiAttachment.contentType?.includes("image"))
						return interaction.followUp({
							content:
								"The attachment provided is not a valid image file\n⤷The attachment must be a valid image file (`jpg`, `png`, `gif` , etc.)",
							ephemeral: true,
						});

					if (emojiAttachment.size >= 256000)
						return interaction.followUp({
							content:
								"The attachment provided is too big\n⤷The maximum image size is 256kb",
							ephemeral: true,
						});

					addedEmoji = emojiAttachment.url;
				}

				let newEmoji;

				try {
					newEmoji = await interaction.guild?.emojis.create({
						attachment: addedEmoji,
						name: `${emojiName}`,
					});
				} catch (err) {
					return interaction.followUp({
						content: `An error occurred while trying to add the emoji\n**⚠ Size is in bytes ⚠**\n\nError:\n\`\`\`js\n${
							(err as Error).message
						}\`\`\``,
						ephemeral: true,
					});
				}

				const emojiEmbed = new EmbedBuilder()
					.setTitle(
						`${newEmoji} Successfully added the emoji: **${newEmoji!.name}**`,
					)
					.setDescription(
						`• Emoji name: ${newEmoji!.name}\n• Emoji ID: ${
							newEmoji!.id
						}\n• URL: [Emoji URL](${emojiURL})\n• Added by: ${
							interaction.user
						}`,
					)
					.setColor("#e91e63")
					.setFooter({
						text: `Requested by: ${interaction.user.tag}`,
						iconURL: interaction.user!.displayAvatarURL(),
					})
					.setTimestamp();

				const newEmojiRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel(newEmoji!.name!)
						.setStyle(ButtonStyle.Link)
						.setEmoji({ name: `${newEmoji?.name}`, id: `${newEmoji?.id}` })
						.setURL(`https://discordapp.com/emojis/${newEmoji!.id}`),
				);

				return interaction.editReply({
					embeds: [emojiEmbed],
					components: [newEmojiRow],
				});
			}
		}
	},
});
