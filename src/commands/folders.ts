import {SlashCommandBuilder} from "discord.js";
import axiosInstance from "../constants/axios";
import {CLICKUP_API} from "../constants/clickup-api";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("folders")
        .setDescription("Shows all folders in Click-Up.")
        .addStringOption(option =>
            option.setName("team")
                .setDescription("The team to show folders for")
                .setRequired(true)),
    async execute(interaction: any) {
        console.log("Executing folders command");
        try {
            const teamId = interaction.options.getString("team");
            await interaction.reply(await getFolders(teamId));
        } catch (error) {
            console.error(error);
            interaction.reply("An error occurred while fetching folders.");
        }
    }
}


async function getFolders(teamId: string) {
    let toReturn = "Folders:\n";
    try {
        const response = await axiosInstance.get(`${CLICKUP_API.TEAMS}/${teamId}${CLICKUP_API.SPACE}`);
        const spaces = response.data.spaces;
        console.log(spaces);
        for (const space of spaces) {
            const spaceResponse = await axiosInstance.get(`${CLICKUP_API.SPACE}/${space.id}${CLICKUP_API.FOLDERS}`);
            console.log(spaceResponse.data);
            const folders = spaceResponse.data.folders;
            const folderStrings = folders.map((folder: any) => `${folder.id} - ${folder.name}`);
            toReturn += `${space.name}:\n${folderStrings.join('\n')}\n`;
        }
        console.log(`Return object \n ${toReturn}`);
        return toReturn;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching folders.");
    }
}
