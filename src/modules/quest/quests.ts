import dbManager from "../../manager/dbManager";

const QUESTS:{name:string,description:string}[] = [
    {
        name: 'Drink water',
        description: 'Grab a glass of water from the kitchen and send a pic of it in the current server',
    },
    {
        name: 'Floor time with Gravity',
        description: 'Lay on the floor for the next 3 minutes'
    },
    {
        name: 'Deskpocalypse Cleanup',
        description: 'Clean your desk'
    },
    {
        name: 'Operation: Vitamin D',
        description: 'Go touch some grass, take a picture as proof'
    },
    {
        name: 'Operation Fresh Air',
        description: 'Open a Window'
    },
    {
        name: 'Teamwork makes the Meme work',
        description: 'Play a game with the people currently in the VC '
    },
    {
        name: 'Meme-ification',
        description: 'Change your profile picture to a meme'
    },
    {
        name: 'Water Tax',
        description: 'You owe someone a glass of water now'
    },
    {
        name: 'Hug Attack',
        description: 'You owe someone a hug now'
    },
    {
        name: 'An apple a day keeps the doctor away',
        description: 'Eat a fruit'
    },
    {
        name: 'Friendflix',
        description: 'You now have to watch a video a friend suggests (maximum of 10 minutes) '
    },
    {
        name: 'Stick Link: The Doodler of Time',
        description: 'Draw a stick figure Link'
    },
    {
        name: 'Navi-gation Failed',
        description: 'Draw Navi c:'
    },
    {
        name: 'Jokepocalypse',
        description: 'Tell a joke (if no one laughs do another quest)'
    },
    {
        name: 'Sing it Loud',
        description: 'Belt out your favorite song'
    },
    {
        name: 'Tongue Twister Tornado',
        description: 'Say a tongue twister three times really fast (bonus points for making yourself laugh)'
    },
    {
        name: 'Dance Like Nobody\'s Watching (Because They Probably Aren\'t)',
        description: 'Bust a move for 30 seconds, even if it\'s embarrassing'
    },
    {
        name: 'The Great Name Switch',
        description: 'Swap nicknames with someone for the next hour'
    },
    {
        name: 'World\'s Worst Translator',
        description: 'Translate a sentence into a language you don\'t know using Google Translate and read it out loud'
    }
]

export function getRandomQuest() {
    return QUESTS[Math.floor(Math.random() * QUESTS.length)];
}

export async function getTodayQuest() {
    const quest = await dbManager.db.dailyQuest.findFirst({
        where: {
            endDate: {
                gte: new Date(),
            },
            startDate: {
                lte: new Date(),
            }
        }
    })

    return quest
}