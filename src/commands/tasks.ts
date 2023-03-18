import {SlashCommandBuilder} from "discord.js";
import {CLICKUP_API} from "../constants/clickup-api";
import axiosInstance from "../constants/axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tasks")
        .setDescription("Shows all tasks in Click-Up.")
        .addStringOption(option =>
            option.setName("list")
                .setDescription("The list to show tasks for")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("assignee")
                .setDescription("The assignee to show tasks for")
                .setRequired(true)),
    async execute(interaction: any) {
        console.log("Executing tasks command");

        async function getTasks(listId: number, asigneeName: string) {
            let toReturn = "Tasks:\n";
            try {
                const response = await axiosInstance.get(`${CLICKUP_API.LISTS}/${listId}${CLICKUP_API.TASKS}?subtasks=true`);
                let tasks = response.data.tasks;
                tasks = tasks.filter((task: any) =>
                    task.assignees.some(
                        (assignee: any) =>
                            assignee.username.toLowerCase().indexOf(asigneeName.toLowerCase()) !== -1
                    )
                );

                console.log(tasks)
                const taskStrings = tasks.sort((a: any,b: any) => a.status > b.status ? 1 : -1 ).map((task: any) => `${task.id} - ${task.name} - ${task.status.status}`);


                toReturn += taskStrings.join('\n');
                return toReturn;
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching tasks.");
            }
        }

        try {
            const listId = interaction.options.getString("list");
            const asigneeName = interaction.options.getString("assignee");
            interaction.reply(await getTasks(listId, asigneeName));
        } catch (error) {
            console.error(error);
            interaction.reply("An error occurred while fetching tasks.");
        }
    }
}
