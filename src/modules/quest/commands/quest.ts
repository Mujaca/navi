import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
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

    interaction.reply({ embeds: [embed], components: [buttonRow] });
}