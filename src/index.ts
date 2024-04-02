import { initialiseConsole } from './utils/console';
import botManager from './manager/botManager';
import commandManager from './manager/commandManager';
import moduleManager from './manager/moduleManager';
// Module imports
import { connectDatabase } from './manager/dbManager';
import { command } from './classes/command';
import { pingCommand } from './commands/ping';

initialiseConsole();
connectDatabase();
botManager.connectBot();

//Register Modules

// Register Commands
commandManager.registerCommand("hey" ,new command('hey', 'Say Hello to Navi!', pingCommand));

// Submit Commands to Discord
commandManager.submitCommands();