// https://api.nekosapi.com/v3/images/random?limit=1&rating=safe

import axios from 'axios';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function getCatGirl(interaction: ChatInputCommandInteraction) {
    const character = interaction.options.getString('Character');
    let url = 'https://api.nekosapi.com/v3/images/random?limit=1&rating=safe';
    if(character) {
        const characterId = await axios.get(`https://api.nekosapi.com/v3/characters?search=${character}`);
        if(characterId.data.items.length === 0) {
            return await interaction.reply({content: 'Character not found', ephemeral: true});
        }
        url += `&character=${characterId.data.items[0].id}`;
    }
    if(!character) url += '&tag=8';


    const cat = await axios.get(url);
    const imageUrl = cat.data.items[0].image_url;

    const embed = new EmbedBuilder();
    embed.setImage(imageUrl);
    embed.setTitle('Here is a cat girl for you');
    embed.setColor('Green');

    return await interaction.reply({ embeds: [embed] });
}