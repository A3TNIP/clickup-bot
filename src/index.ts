import {Client, Collection, Events, GatewayIntentBits, Interaction} from 'discord.js';
import * as path from 'path';
import * as fs from 'fs';

class MyClient extends Client {
    commands: Collection<string, any>;
}

export const env = require("dotenv").config({path: __dirname + "/../.env"});
const token: string = env.parsed?.TOKEN;

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// @ts-ignore
client.commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));

    if ('data' in command && 'execute' in command) {
        // @ts-ignore
        client.commands.set(command.data.name, command);
    } else {
        console.warn(`Command ${file} does not have a data or execute property!`);
    }
}

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const client = interaction.client as MyClient;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
    console.log(interaction);
});

client.on('ready', () => {
    const c = client.user ?? {tag: "Unknown"}
    console.log(`Logged in as ${c.tag}!`);
});

client!.login(token).then();
