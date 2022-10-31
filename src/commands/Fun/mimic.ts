import { TextChannel, ApplicationCommandOptionType } from "discord.js";
import { Command } from "#lib/structures";
import { CommandType } from "#lib/enums";

export default new Command({
	type: CommandType.ChatInput,
	description: "Mimic a user.",
	options: [
		{
			name: "user",
			description: "User to mimic.",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
		{
			name: "message",
			description: "Message to mimic the user.",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],
	async commandRun(interaction) {
		const user = interaction.options.getUser("user", true);
		const message = interaction.options.getString("message", true);

		const GuildMember = interaction.guild!.members.cache.get(user.id);

		let userDisplayName;

		if (!GuildMember) userDisplayName = user.username;
		else userDisplayName = GuildMember.nickname || user.username;

		const mimicWebhook = (interaction.channel! as TextChannel).createWebhook({
			name: `${userDisplayName}`,
			avatar: `${user.displayAvatarURL({ forceStatic: true })}`,
		});

		if (message.length >= 1024)
			return interaction.reply({
				content: `Your message is too long, I can only send up to 1024 characters\n\nYour message: ${message.length} characters`,
				ephemeral: true,
			});

		if (interaction.user.id === user.id)
			return interaction.reply({
				content: "You can't mimic yourself, try again and mimic someone else!",
				ephemeral: true,
			});
		await interaction.deferReply({
			ephemeral: true,
		});

		await (
			await mimicWebhook
		)
			.send({
				content: `${message}`,
				allowedMentions: {
					parse: [],
				},
			})
			.then(() => {
				interaction.editReply({
					content: `Message sent || Feel free to dismiss this message`,
				});
				return setTimeout(async () => (await mimicWebhook).delete(), 3000);
			});
	},
});
