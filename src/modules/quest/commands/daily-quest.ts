import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { getTodayQuest } from '../quests';
import { getUser } from '../../../manager/userManager';
import dbManager from '../../../manager/dbManager';

export async function dailyQuest(interaction: ChatInputCommandInteraction) {
    const quest = await getTodayQuest();

    const doneButton = new ButtonBuilder()
    .setCustomId('dailyQuestDone')
    .setLabel('Done')
    .setStyle(ButtonStyle.Success)

    const buttonRow:any = new ActionRowBuilder()
    .setComponents(doneButton)

	const embed = new EmbedBuilder();
	embed.setTitle(quest.name);
	embed.setDescription(quest.description);
	embed.addFields([{ name: 'Reward', value: quest.reward.toString() + " Rupies" }]);
    embed.setColor('Gold')

    interaction.reply({ embeds: [embed], components: [buttonRow] });
}

export async function dailyQuestDone(interaction: ButtonInteraction) {
    const quest = await getTodayQuest();
    const user = await getUser(interaction.user.id);

    const hasCompleted = await dbManager.db.completedDailyQuest.findFirst({
        where: {
            userId: user.id,
            questId: quest.id
        }
    });
    
    if(hasCompleted) {
        await interaction.reply({ content: `You have already completed the quest: ${quest.name}!`, ephemeral: true });
        return;
    }

    await interaction.reply({ content: `You have completed the quest: ${quest.name}!`, ephemeral: true });
    await dbManager.db.botUser.update(
        {
            where: {
                id: user.id
            },
            data: {
                rupies: {
                    increment: quest.reward
                }
            }
        }
    );

    await dbManager.db.completedDailyQuest.create({
        data: {
            userId: user.id,
            questId: quest.id
        }
    });
}