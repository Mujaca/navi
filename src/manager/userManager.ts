import { BotUser } from "@prisma/client";
import dbManager from "./dbManager";
import botManager from "./botManager";

const cache:Map<string, BotUser> = new Map<string, BotUser>();

export async function getUser(id:string):Promise<BotUser> {
    if(cache.has(id)) return cache.get(id);
    const user = await dbManager.db.botUser.findUnique({
        where: {
            id: id
        }
    })
    if(!user) return await createUser(id);

    cache.set(id, user);
    return user;
}

export async function createUser(id:string):Promise<BotUser> {
    const discordUser = await botManager.client.users.fetch(id);
    
    const user = await dbManager.db.botUser.create({
        data: {
            id: id,
            username: discordUser.username,
            displayName: discordUser.displayName,
        }
    })
    cache.set(id, user);
    return user;
}