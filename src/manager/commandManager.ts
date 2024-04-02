import { GatewayDispatchEvents, InteractionType, Routes } from "@discordjs/core";
import botManager from "./botManager";
import { command } from "../classes/command";
import { SlashCommandBuilder } from "discord.js";

const map:Map<string, command> = new Map();

botManager.client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;
    const command = map.get(interaction.commandName);
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
    console.error("Registered command: " + commandName + "")
}

async function submitCommands() {
    console.log(JSON.stringify(bodyArray))
    await botManager.rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
        body: bodyArray
    });

    console.error(`Submitted all Commands!`)
}

export default {
    registerCommand,
    submitCommands
}