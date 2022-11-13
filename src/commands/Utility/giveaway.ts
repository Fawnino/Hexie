import { CommandType } from "#lib/enums";
import { CelestineCommand } from "#lib/structures";
import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChannelType,
	ComponentType,
	EmbedBuilder,
	GuildMember,
	GuildTextBasedChannel,
	PermissionsBitField,
	time,
} from "discord.js";
import ms from "ms";

export default new CelestineCommand({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Run a giveaway.",
	dmPermission: false,
	options: [
		{
			name: "prize",
			description: "What are you giving away?",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "time",
			description: "Time period of the giveway",
			type: ApplicationCommandOptionType.Integer,
			min_value: 1,
			required: true,
		},
		{
			name: "unit",
			description: "The unit of the time",
			type: ApplicationCommandOptionType.String,
			choices: [
				{
					name: "Seconds",
					value: "s",
				},
				{
					name: "Minutes",
					value: "m",
				},
				{
					name: "Hours",
					value: "h",
				},
				{
					name: "Days",
					value: "d",
				},
			],
			required: true,
		},
		{
			name: "winners",
			description: "The number of winners.",
			type: ApplicationCommandOptionType.Integer,
			min_value: 1,
		},
		{
			name: "channel",
			description: "Send the giveaway to a differant channel",
			type: ApplicationCommandOptionType.Channel,
			channel_types: [ChannelType.GuildText],
		},
	],
	async commandRun(interaction) {
		const prize = interaction.options.getString("prize", true);

		const period = interaction.options.getInteger("time", true);
		const unit = interaction.options.getString("unit", true);
		const duration = ms(period + unit);
		const endsAt = new Date();
		endsAt.setMilliseconds(endsAt.getMilliseconds() + duration);

		if (
			!(interaction.member as GuildMember).permissions.has([
				PermissionsBitField.Flags.ManageGuild,
			])
		)
			return interaction.reply({
				content:
					"You do not have the sufficient permission `ManageGuild` to use this command!",
			});

		const formatedTime = `${time(endsAt, "R")} (${time(endsAt, "f")})`;

		const winnerCount = interaction.options.getInteger("winners") ?? 1;

		const channel = (interaction.options.getChannel("cahnnel") ??
			interaction.channel) as GuildTextBasedChannel; // We'd expect the channel to be in a guild;

		const embed = new EmbedBuilder()
			.setTitle(prize)
			.setFields(
				{
					name: "Ends",
					value: formatedTime,
				},
				{
					name: "Hosted by",
					value: interaction.user.toString(),
				},
				{
					name: "Winners",
					value: winnerCount.toString(),
				},
			)
			.setTimestamp()
			.setColor("Default");

		const row = new ActionRowBuilder<ButtonBuilder>().setComponents(
			new ButtonBuilder()
				.setCustomId("giveaway")
				.setEmoji("🎉")
				.setLabel("0")
				.setStyle(ButtonStyle.Primary),
		);

		const [giveBtn] = row.components;

		const msg = await channel.send({
			embeds: [embed],
			components: [row],
		});

		await interaction.reply({
			content: `Sent the giveaway successfully to ${channel}`,
			ephemeral: true,
		});

		const collector = msg.createMessageComponentCollector({
			filter,
			componentType: ComponentType.Button,
			time: duration,
			dispose: true,
		});

		// We wanna ignore if the user already joined
		function filter(i: ButtonInteraction): boolean {
			return !collector.users.has(i.user.id);
		}

		collector.on("collect", (i) => {
			// Updating the entries count
			giveBtn.setLabel(`${collector.users.size}`);

			i.update({
				components: [row],
			});
		});

		collector.on("ignore", async (i) => {
			const reply = await i.reply({
				content: "You already joined.",
				components: [
					new ActionRowBuilder<ButtonBuilder>().setComponents(
						new ButtonBuilder()
							.setCustomId(Math.random().toExponential())
							.setLabel("Leave the giveaway?")
							.setStyle(ButtonStyle.Danger),
					),
				],
				ephemeral: true,
				fetchReply: true, // for some reason awaitMessageComponent doesn't work on interactionResponse
			});

			const int = await reply
				.awaitMessageComponent({ componentType: ComponentType.Button })
				.catch(() => null);

			if (!int) {
				i.editReply({
					components: [],
				});
				return;
			}

			// Avoiding handleDispose filters
			collector.collected.set(i.id, i);
			collector.users.delete(i.user.id);

			collector.handleDispose(i);

			int.update({
				content: "You left the giveaway!",
				components: [],
			});
		});

		collector.on("dispose", (i) => {
			// Making sure that if you wanna limit the entries it won't include who left
			collector.total--;

			// Deleting any collected item from that user
			const dispose =
				collector.collected.findKey((v) => v.user.id === i.user.id) ?? "";
			collector.collected.delete(dispose);

			// Updating the entries count
			giveBtn.setLabel(`${collector.users.size}`);

			i.message.edit({
				components: [row],
			});
		});

		collector.once("end", (collected, reason) => {
			if (reason !== "time") return;

			const winners = collector.users.random(winnerCount);

			embed.setFields([
				{
					name: "Ended",
					value: formatedTime,
				},
				{
					name: "Hosted by",
					value: interaction.user.toString(),
				},
				{
					name: "Winners",
					value: `${winners.join(", ") || "None"}`,
				},
			]);

			row.components.forEach((v) => v.setDisabled(true));

			msg.edit({
				embeds: [embed],
				components: [row],
			});

			if (winners.length)
				msg.reply(`Gongrats ${winners.join(", ")}! You won **\`${prize}\`**!`);
			else msg.reply("No one participated :(");
		});
	},
});
