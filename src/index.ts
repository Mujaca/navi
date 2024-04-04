import { initialiseConsole } from './utils/console';
import botManager from './manager/botManager';
import commandManager from './manager/commandManager';
import moduleManager from './manager/moduleManager';
// Module imports
import { connectDatabase } from './manager/dbManager';
import { command } from './classes/command';
import { pingCommand } from './commands/ping';
import { QuestModule } from './modules/quest';
import { createEmbed } from './commands/createEmbed';
import { APIApplicationCommandOptionChoice, Colors } from 'discord.js';
import { getCat } from './commands/cat';

initialiseConsole();
connectDatabase();
botManager.connectBot();

//Register Modules
moduleManager.registerModule('QuestModule', new QuestModule());

// Register Commands
commandManager.registerCommand('hey', new command('hey', 'Say Hello to Navi!', pingCommand));
commandManager.registerCommand('cat', new command('cat', 'Get a random cat image', getCat));

const createEmbedCommand = new command('createembed', 'Create a Embed', createEmbed);
createEmbedCommand.commandBuilder.addStringOption((option) => option.setName('title').setDescription('Title of the Embed').setRequired(true));
createEmbedCommand.commandBuilder.addStringOption((option) => option.setName('description').setDescription('Description of the Embed').setRequired(true));
createEmbedCommand.commandBuilder.addStringOption((option) => option.setName('color').setDescription('Color of the Embed').setRequired(false));
createEmbedCommand.commandBuilder.addStringOption((option) => option.setName('image').setDescription('Image URL of the Embed').setRequired(false));
commandManager.registerCommand('createembed', createEmbedCommand);

// Submit Commands to Discord
commandManager.submitCommands();
