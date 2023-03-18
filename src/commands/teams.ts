import {SlashCommandBuilder} from "discord.js";
import {CLICKUP_API} from "../constants/clickup-api";
import axiosInstance from "../constants/axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("teams")
        .setDescription("Shows all teams in Click-Up."),
    async execute(interaction: any) {
        console.log("Executing teams command");
        try {
            await interaction.reply(await getTeams());
        } catch (error) {
            console.error(error);
            interaction.reply("An error occurred while fetching teams.");
        }
    }
}

async function getTeams() {
    const response = await axiosInstance.get(CLICKUP_API.TEAMS);
    const teams = response.data.teams;
    const teamStrings = teams.map((team: any) => `${team.id} - ${team.name}`);
    return `Teams:\n${teamStrings.join('\n')}`;
}

