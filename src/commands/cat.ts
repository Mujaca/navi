// https://api.thecatapi.com/v1/images/search
import axios from 'axios';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function getCat(interaction: ChatInputCommandInteraction) {
    const cat = await axios.get('https://api.thecatapi.com/v1/images/search');
    const imageUrl = cat.data[0].url;

    const embed = new EmbedBuilder();
    embed.setImage(imageUrl);
    embed.setTitle('Here is a cat for you');
    embed.setColor('Green');

    return await interaction.reply({ embeds: [embed] });
}