import { Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	ApplicationCommandOptionType,
	EmbedBuilder,
	GuildMember,
	PermissionsBitField,
} from "discord.js";
export default new Command({
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
			.setColor(0xffff)
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
