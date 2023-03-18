import {SlashCommandBuilder} from "discord.js";
import axiosInstance from "../constants/axios";
import {CLICKUP_API} from "../constants/clickup-api";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lists")
        .setDescription("Shows all lists in Click-Up.")
        .addStringOption(option =>
            option.setName("folder")
                .setDescription("The folder to show lists for")
                .setRequired(true)),
    async execute(interaction: any) {
        console.log("Executing lists command");
        try {
            const folderId = interaction.options.getString("folder");
            interaction.reply(await getLists(folderId));
        } catch (error) {
            console.error(error);
            interaction.reply("An error occurred while fetching lists.");
        }
    }
}

async function getLists(folderId: string) {
    let toReturn = "Lists:\n";
    try {
        const response = await axiosInstance.get(`${CLICKUP_API.FOLDERS}/${folderId}${CLICKUP_API.LISTS}`);
        const lists = response.data.lists;
        const listStrings = lists.map((list: any) => `${list.id} - ${list.name}`);
        toReturn += listStrings.join('\n');
        return toReturn;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching lists.");
    }
}
