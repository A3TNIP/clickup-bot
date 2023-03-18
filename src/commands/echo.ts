import {SlashCommandBuilder} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Replies with the provided text.")
        .addStringOption(option =>
            option.setName("input")
                .setDescription("The text to echo back")
                .setRequired(true)),
    async execute(interaction: any) {
        const input = interaction.options.getString("input");
        await interaction.reply(input);
    }
}
