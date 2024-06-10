import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import dbManager from '../manager/dbManager';

export async function addSuggestion(interaction: ChatInputCommandInteraction) {
    const suggestion = interaction.options.getString('suggestion');
    if(!suggestion) return await interaction.reply({content: 'Please provide a suggestion', ephemeral: true});
    
    await dbManager.db.suggestion.create({
        data: {
            suggestion: suggestion,
            userId: interaction.user.id
        }
    })
    return await interaction.reply({content: 'Suggestion added', ephemeral: true});
}