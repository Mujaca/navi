import { CronJob } from "cron";
import { Module } from "../../classes/module";
import { getRandomQuest } from "./quests";
import dbManager from "../../manager/dbManager";
import { command } from "../../classes/command";
import { dailyQuest, dailyQuestDone } from "./commands/daily-quest";
import commandManager from "../../manager/commandManager";
import interactionManager from "../../manager/interactionManager";
import { interaction } from "../../classes/interaction";

export class QuestModule extends Module {
    constructor() {
        super("QuestModule");

        const dailyQuestCommand = new command("dailyquest", "Show todays Quest", dailyQuest);
        commandManager.registerCommand("dailyquest", dailyQuestCommand);

        interactionManager.registerInteraction('dailyQuestDone', new interaction('dailyQuestDone', dailyQuestDone));

        const questCron = new CronJob('0 0 0 * * *', this.newQuest);
        questCron.start();
        this.newQuest();
    }

    async newQuest(){
        const quest = getRandomQuest();
        await dbManager.db.dailyQuest.create({
            data: {
                name: quest.name,
                description: quest.description,
                startDate: new Date(),
                endDate: new Date(Date.now() + 86400000),
                reward: Math.floor(getRandomArbitrary(1000, 2500)),
            }
        })
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}