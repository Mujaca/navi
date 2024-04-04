// https://api.quotable.io/random?tags=famous-quotes

import axios from 'axios';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function randomQuote(interaction: ChatInputCommandInteraction) {
    const fact = await axios.get('https://api.quotable.io/random?tags=famous-quotes');
    const factText = fact.data.content;

    const embed = new EmbedBuilder();
    embed.setTitle(fact.data.author);
    embed.setDescription(factText);
    embed.setColor('Green');

    return await interaction.reply({ embeds: [embed] });
}