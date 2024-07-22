import { GatewayDispatchEvents, InteractionType, Routes } from "@discordjs/core";
import botManager from "./botManager";
import { command } from "../classes/command";
import { SlashCommandBuilder } from "discord.js";
import { getUser } from "./userManager";
import dbManager from "./dbManager";

const map:Map<string, command> = new Map();

botManager.client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;
    await getUser(interaction.user.id)
    const command = map.get(interaction.commandName);

    const dbCommand = await dbManager.db.commandUssage.findFirst({
        where: {
            command: interaction.commandName
        }
    })

    await dbManager.db.commandUssage.update({
        data: {
            usage: {
                increment: 1
            }
        },
        where: {
            id: dbCommand.id
        }
    })

    command?.callBack(interaction);
})

const bodyArray: SlashCommandBuilder[] = []
async function registerCommand(commandName:string, commandClass:command){
    map.set(commandName, commandClass)
    const command = commandClass.getDiscordCommand();
    // @ts-ignore
    command.integration_types = [1];
    // @ts-ignoremus
    command.contexts = [0, 1, 2];
    bodyArray.push(command)
    
    const dbCommand = await dbManager.db.commandUssage.findFirst({
        where: {
            command: commandName
        }
    })
    if(!dbCommand) await dbManager.db.commandUssage.create({
        data: {
            command: commandName,
            usage: 0
        }
    })

    console.error("Registered command: " + commandName + "")
}

async function submitCommands() {
    await botManager.rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
        body: bodyArray
    });

    console.error(`Submitted all Commands!`)
}

export default {
    registerCommand,
    submitCommands
}