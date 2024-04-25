// https://api.nekosapi.com/v3/images/random?limit=1&rating=safe

import axios from 'axios';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function getCatGirl(interaction: ChatInputCommandInteraction) {
    const cat = await axios.get('https://api.nekosapi.com/v3/images/random?limit=1&rating=safe&tag=8');
    const imageUrl = cat.data.items[0].image_url;

    const embed = new EmbedBuilder();
    embed.setImage(imageUrl);
    embed.setTitle('Here is a cat girl for you');
    embed.setColor('Green');

    return await interaction.reply({ embeds: [embed] });
}