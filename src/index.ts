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
import { getCatGirl } from './commands/catGirl';
import { randomFact } from './commands/randomFact';
import { randomQuote } from './commands/randomQuote';
import { addSuggestion } from './commands/suggestion';

initialiseConsole();
connectDatabase();
botManager.connectBot();

//Register Modules
// moduleManager.registerModule('QuestModule', new QuestModule());

// Register Commands
commandManager.registerCommand('hey', new command('hey', 'Say Hello to Navi!', pingCommand));
commandManager.registerCommand('cat', new command('cat', 'Get a random cat image', getCat));
const catgirl = new command('catgirl', 'Get a random catGirl image', getCatGirl);
catgirl.commandBuilder.addStringOption((option) => option.setName('character').setDescription("What Catgirl do you want an image of?").setRequired(false))
commandManager.registerCommand('catgirl', catgirl);

commandManager.registerCommand('randomquote', new command('randomquote', 'Get a random Quote', randomQuote));
const randomFactCommand = new command('randomfact', 'Get a random fact', randomFact);
randomFactCommand.commandBuilder.addStringOption((option) => option.setName('language').setDescription('Language of the fact').setRequired(false).addChoices({ name: 'English', value: 'en' }, { name: 'German', value: 'de'}));
commandManager.registerCommand('randomfact', randomFactCommand);

const createEmbedCommand = new command('createembed', 'Create a Embed', createEmbed);
createEmbedCommand.commandBuilder.addStringOption((option) => option.setName('title').setDescription('Title of the Embed').setRequired(true));
createEmbedCommand.commandBuilder.addStringOption((option) => option.setName('description').setDescription('Description of the Embed').setRequired(true));
createEmbedCommand.commandBuilder.addStringOption((option) => option.setName('color').setDescription('Color of the Embed').setRequired(false));
createEmbedCommand.commandBuilder.addStringOption((option) => option.setName('image').setDescription('Image URL of the Embed').setRequired(false));
commandManager.registerCommand('createembed', createEmbedCommand);

const suggestionCommand = new command('suggestion', 'Add a Suggestion', addSuggestion);
suggestionCommand.commandBuilder.addStringOption((option) => option.setName('suggestion').setDescription('Suggestion to add').setRequired(true));
commandManager.registerCommand('suggestion', suggestionCommand);

// Submit Commands to Discord
commandManager.submitCommands();
