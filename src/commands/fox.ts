// https://randomfox.ca/floof/
import axios from 'axios';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function getFox(interaction: ChatInputCommandInteraction) {
    const cat = await axios.get('https://randomfox.ca/floof/');
    const imageUrl = cat.data.image;

    const embed = new EmbedBuilder();
    embed.setImage(imageUrl);
    embed.setTitle('Here is a fox for you');
    embed.setColor('Green');

    return await interaction.reply({ embeds: [embed] });
}