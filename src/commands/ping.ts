import { ChatInputCommandInteraction } from "discord.js";

export async function pingCommand(interaction: ChatInputCommandInteraction) {
    return await interaction.reply("Listen!");
}