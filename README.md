<div align="center">

# Hexie

<a href="https://discord.com/api/oauth2/authorize?client_id=1021374807683637249&permissions=8&scope=applications.commands%20bot"><img src="https://img.shields.io/static/v1?label=Invite%20Me&message=Hexie%239848&plastic&color=5865F2&logo=discord"></a>
<img src="https://badgen.net/badge/icon/typescript?icon=typescript&label">

<br />
	<p>
		<a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
	</p>
</div>

## Features

- Multi-Purpose Discord Bot
- Easy to Use and Configure
- Simple and Fun Commands
- Setup the Bot Without needing to Code Much

> This handler was made with the template of [EvolutionX-10](https://github.com/EvolutionX-10) click **[me](https://github.com/EvolutionX-10/discordbot)** to get redirected to the template! </br>

## Setup

Now you can proceed to install dependencies. <br />
After that, we will compile our TypeScript code to JavaScript

Note: This project uses `yarn` to manage dependencies. If you don't have `yarn` installed, you can install it using [`npm install -g yarn`](https://yarnpkg.com/en/docs/install).

```bash
yarn && yarn build
```

## Setting the Token and Important Stuff

## Starting the bot

Now we can start the bot using `yarn start` script.

```bash
yarn start
```

Note: You need to have node version `16.9` or higher!

<details>

<summary>Fix an Issue</summary>

#### Change Owner ID

1. Go to `src/lib/structures/Client.ts`
2. Change line 29: `this.ownerIds = ["Your-Owner-Id-Here"];`

</details>

<details>
<summary>Commands</summary>

#### Example

```ts
import { CommandType } from "#lib/enums";
import { Command } from "#lib/structures";

export default new Command({
	category: "Utility",
	type: CommandType.ChatInput,
	description: "Ping Pong!!",
	async commandRun(interaction) {
		return interaction.reply({ content: "Pong!", ephemeral: true });
	},
	async messageRun(message) {
		return message.channel.send("Pong!");
	},
});
```

</details>

<details>

<summary>Listeners</summary>

#### Example

```ts
import { Listener } from "#lib/structures";

export default new Listener({
	event: "ready",
	once: true,
	run(client) {
		client.logger.info(`Logged in as ${client.user.tag}`);
	},
});
```

</details>

<details>

<summary> Token Setup</summary>

#### Tutorial

1. Rename `.env.example` to `.env`
2. Add the missing parameters to the `.env` file in this format

```
DISCORD_TOKEN=<your-token-without-braces>
CHANNEL_ID=<your-startup-channel-id-without-braces>
```

</details>

## Contributing

To contribute to this repository, feel free to fork the repository and make changes. Once you have made your changes, you can submit a pull request.
A change should have a valid reason, and features should be added only if it's basic.

1. Fork the repository and select the **main** branch.
2. Create a new branch and make your changes.
3. Make sure you use a proper code formatter. [^lint]
4. Make sure you have a good commit message.[^commit]
5. Push your changes.
6. Submit a pull request [here][pr].
<!-- References -->

[^git]: It's recommended to have [git](https://git-scm.com/) installed on your machine.
[^lint]: We recommend using [`prettier`] to style your code.
[^commit]: We strongly follow the [`Commit Message Conventions`]. This is important when commiting your code for a PR.

[`prettier`]: https://prettier.io/
[`commit message conventions`]: https://conventionalcommits.org/en/v1.0.0/
[pr]: https://github.com/EvolutionX-10/discordbot/pulls

<a href = "https://ko-fi.com/fawnino" ><img src = "https://ko-fi.com/img/githubbutton_sm.svg" alt = KoFi></a>
