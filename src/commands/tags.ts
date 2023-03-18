import {SlashCommandBuilder} from "discord.js";
import {CLICKUP_API} from "../constants/clickup-api";
import axiosInstance from "../constants/axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tags")
        .setDescription("Shows all tags in Click-Up.")
        .addStringOption(option =>
            option.setName("space")
                .setDescription("The space to show tags for")
                .setRequired(true)),
    async execute(interaction: any) {
        const spaceId = interaction.options.getString("space");
        let toReturn = "Tags:\n";
        try {
            const response = await axiosInstance.get(`${CLICKUP_API.SPACE}/${spaceId}${CLICKUP_API.TAGS}`);
            const tags = response.data.tags;
            const tagStrings = tags.map((tag: any) => `${tag.name}`);
            toReturn += tagStrings.join('\n');
            await interaction.reply(toReturn);
        } catch (e) {
            console.error(e);
            await interaction.reply("An error occurred while fetching tags.");
        }
    }
}
