import {SlashCommandBuilder} from "discord.js";
import {CLICKUP_API} from "../constants/clickup-api";
import axiosInstance from "../constants/axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("space")
        .setDescription("Shows all spaces in Click-Up.")
        .addStringOption(option =>
            option.setName("team")
                .setDescription("The team to show spaces for")
                .setRequired(true)),
    async execute(interaction: any) {
        console.log("Executing space command");

        async function getSpaces(teamId: any) {
            let toReturn = "Spaces:\n";
            try {
                const response = await axiosInstance.get(`${CLICKUP_API.TEAMS}/${teamId}${CLICKUP_API.SPACE}`);
                const spaces = response.data.spaces;
                spaces.map((space: any) => toReturn += `${space.id} - ${space.name}\n`);
                console.log(`Return object \n ${toReturn}`);
                return toReturn;
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching folders.");
            }
        }

        try {
            const teamId = interaction.options.getString("team");
            await interaction.reply(await getSpaces(teamId));
        } catch (error) {
            console.error(error);
            interaction.reply("An error occurred while fetching spaces.");
        }
    }
}
