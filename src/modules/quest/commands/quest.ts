import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { getUserQuest } from "../quests";

export async function quest(interaction: ChatInputCommandInteraction) {
    const quest = await getUserQuest(interaction.user.id);

    const doneButton = new ButtonBuilder()
    .setCustomId('questDone')
    .setLabel('Done')
    .setStyle(ButtonStyle.Success)

    const skipbutton = new ButtonBuilder()
    .setCustomId('questSkip')
    .setLabel('Skip')
    .setStyle(ButtonStyle.Danger)

    const buttonRow:any = new ActionRowBuilder()
    .setComponents(doneButton, skipbutton)

    const embed = new EmbedBuilder();
    embed.setTitle(quest.name);
    embed.setDescription(quest.description);
    embed.addFields([{ name: 'Reward', value: quest.reward.toString() + " Rupies" }]);
    embed.setColor('Gold')

    const a = await interaction.reply({ embeds: [embed], components: [buttonRow] });
}

export async function questDone(interaction: ButtonInteraction) {
    interaction.reply({ content: 'Coming soon™', ephemeral: true })
}

export async function questSkip(interaction: ButtonInteraction) {
    interaction.reply({ content: 'Coming soon™', ephemeral: true })
}