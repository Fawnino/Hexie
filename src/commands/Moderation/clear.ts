import { CelestineCommand } from "#lib/structures";
import { CommandType } from "#lib/enums";
import {
	ApplicationCommandOptionType,
	EmbedBuilder,
	GuildMember,
	PermissionsBitField,
	TextChannel,
} from "discord.js";

export default new CelestineCommand({
	type: CommandType.ChatInput,
	description: "Delete an amount of messages.",
	category: "Moderation",
	options: [
		{
			name: "amount",
			description: "The number of messages that you want to delete",
			type: ApplicationCommandOptionType.Integer,
			minValue: 1,
			maxValue: 100,
			required: true,
		},
	],
	async messageRun(message, args) {
		const count = parseInt(args[0]);

		if (
			!(message.member as GuildMember).permissions.has([
				PermissionsBitField.Flags.ManageMessages,
			])
		)
			return message.reply({
				content:
					"You do not have the sufficient permission `ManageMessages` to use this command!",
			});

		if (!message.channel) return;

		const messages = await message.channel!.messages.fetch({
			limit: count,
		});

		await (message.channel! as TextChannel).bulkDelete(messages, true);

		const successEmbed = new EmbedBuilder()
			.setTitle(`Success!`)
			.setColor("Green")
			.setAuthor({
				name: `${message.author.tag}`,
				iconURL: `${message.author.displayAvatarURL({ forceStatic: true })}`,
			})
			.setDescription(`Successfully deleted **${count}** messages!`)
			.setFooter({
				text: `This message auto-deletes in 5 seconds`,
				iconURL: message.client.user.displayAvatarURL(),
			});

		return await message
			.reply({
				embeds: [successEmbed],
			})
			.then((msg) => {
				setTimeout(() => msg.delete(), 5000);
			});
	},
	async commandRun(interaction) {
		const count = interaction.options.getInteger("amount", true);

		if (
			!(interaction.member as GuildMember).permissions.has([
				PermissionsBitField.Flags.ManageMessages,
			])
		)
			return interaction.reply({
				content:
					"You do not have the sufficient permission `ManageMessages` to use this command!",
				ephemeral: true,
			});

		if (!interaction.channel) return;

		const messages = await interaction.channel!.messages.fetch({
			limit: count,
		});

		await (interaction.channel! as TextChannel).bulkDelete(messages, true);

		const successEmbed = new EmbedBuilder()
			.setTitle(`Success!`)
			.setColor("Green")
			.setAuthor({
				name: `${interaction.user.tag}`,
				iconURL: `${interaction.user.displayAvatarURL({ forceStatic: true })}`,
			})
			.setDescription(`Successfully deleted **${count}** messages!`)
			.setFooter({
				text: `This message auto-deletes in 5 seconds`,
				iconURL: interaction.client.user.displayAvatarURL(),
			});

		setTimeout(() => interaction.deleteReply(), 5000);

		return await interaction.reply({
			embeds: [successEmbed],
		});
	},
});
