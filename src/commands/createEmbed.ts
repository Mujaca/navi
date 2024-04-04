import { ChatInputCommandInteraction, ColorResolvable, EmbedBuilder } from "discord.js";

export async function createEmbed(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder();
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const color = interaction.options.getString("color");
    const imageUrl = interaction.options.getString("image");

    embed.setTitle(title);
    embed.setDescription(description);
    embed.setColor(color as ColorResolvable);
    embed.setAuthor({
        name: interaction.user.displayName,
        iconURL: interaction.user.avatarURL()
    });
    if(imageUrl) embed.setImage(imageUrl);

    return await interaction.reply({ embeds: [embed] });
}