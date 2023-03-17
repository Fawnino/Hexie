import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	ApplicationCommandOptionType,
	EmbedBuilder,
	GuildMember,
	PermissionsBitField,
} from "discord.js";
export default new CelestineCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Create a new poll!",
	options: [
		{
			type: ApplicationCommandOptionType.String,
			description: "Question so people can vote on the poll.",
			name: "question",
			required: true,
		},
	],
	async messageRun(message, args) {
		const question = args.join(" ");

		if (!args.join(" "))
			return message.reply({
				content: "Ask something, you can't start a poll without a question!",
			});

		if (
			!(message.member! as GuildMember).permissions.has([
				PermissionsBitField.Flags.EmbedLinks,
			])
		)
			return message.reply({
				content:
					"You do not have the sufficient permission `EmbedLinks` to use this command!",
			});

		message.delete();

		const questionEmbed = new EmbedBuilder()
			.setColor(0xfde4f2)
			.setTitle(`${message.author.tag} Asks:`)
			.setThumbnail(
				`https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/185/bar-chart_1f4ca.png`,
			)
			.setFooter({
				text: `Requested by: ${message.author.tag}`,
				iconURL: `${message.author.displayAvatarURL({ forceStatic: true })}`,
			})
			.setDescription(question);

		const sent = await message.channel.send({
			embeds: [questionEmbed],
		});
		await sent.react("👍");
		await sent.react("👎");
	},
	async commandRun(interaction) {
		const question = interaction.options.getString("question");

		if (
			!(interaction.member! as GuildMember).permissions.has([
				PermissionsBitField.Flags.EmbedLinks,
			])
		)
			return interaction.reply({
				content:
					"You do not have the sufficient permission `EmbedLinks` to use this command!",
				ephemeral: true,
			});

		const questionEmbed = new EmbedBuilder()
			.setColor(0xfde4f2)
			.setTitle(`${interaction.user.tag} Asks:`)
			.setThumbnail(
				`https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/185/bar-chart_1f4ca.png`,
			)
			.setFooter({
				text: `Requested by: ${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({ forceStatic: true })}`,
			})
			.setDescription(question);

		const sent = await interaction.reply({
			embeds: [questionEmbed],
			fetchReply: true,
		});
		await sent.react("👍");
		await sent.react("👎");
	},
});
