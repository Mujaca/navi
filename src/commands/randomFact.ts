// https://uselessfacts.jsph.pl/api/v2/facts/random

import axios from 'axios';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function randomFact(interaction: ChatInputCommandInteraction) {
    const lang = interaction.options.getString('language') || 'en';
    const fact = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random' + `?language=${lang}`);
    const factText = fact.data.text;

    const embed = new EmbedBuilder();
    embed.setTitle('Random Fact');
    embed.setDescription(factText);
    embed.setColor('Green');

    return await interaction.reply({ embeds: [embed] });
}