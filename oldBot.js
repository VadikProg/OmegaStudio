const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const client = new Discord.Client();
client.login("NjE3MDMwNDA4NjA5MjAyMTk5.XWllQQ.PBswHbaMsyGnAdzTVSvpmzwvBnc"); //В кавычках вводим токен вашего бота. Пример: client.login("33535320424082");
const prefix = "@@"; //Префикс команд вашего бота
const MusicPrefix = "//"; //Префикс команд музыкальной части
//Переменные, пользовательские найстройки
var timerId = [];
var trollingCh = "🌟general";
const queue = new Map();
//Переменные, пользовательские найстройки


client.on('ready', () => {
    console.log('Bot is Online.');
        (function(){
            DiscordRichPresence discordPresence;
            memset(&discordPresence, 0, sizeof(discordPresence));
            discordPresence.state = "Следит за порядком";
            discordPresence.details = "Майор";
            discordPresence.partyId = "ae488379-351d-4a4f-ad32-2b9b01c91657";
            discordPresence.partySize = 69;
            discordPresence.partyMax = 69;
            discordPresence.spectateSecret = "MTIzNDV8MTIzNDV8MTMyNDU0";
            discordPresence.joinSecret = "MTI4NzM0OjFpMmhuZToxMjMxMjM= ";
            Discord_UpdatePresence(&discordPresence);
    })()
});

function sys0(message){
    const systemCh = message.guild.channels.find(channel => channel.name === "system");
    systemCh.send("!d bump");
}
client.on('message', message => {


    if(message.content.startsWith(prefix)){          //Если оно начинается с нашего префикса

        if (message.author.bot) return undefined;   //Если оно наше, то возвращаем undefined
        message.content = message.content.toLowerCase();
        let args = message.content.slice(prefix.length).trim().split(" "); //Отделяем префикс от строки, плюс чистим пробелы до и после строки, получаем аргумент с командой
        let command = args.shift().toLowerCase();   //Отделяем первое слово т.е. команду от аргумента
        if(command == "say"){
            const trChannel = message.guild.channels.find(channel => channel.name === trollingCh); //Поиск нужного текстового канала
            trChannel.send(args.join(" "));
        }else if(command == "usech"){
            trollingCh = args[0];
        }else if(command == "timeoutstop"){
            for(let i = 0; i < timerId.length;i++){
                clearInterval(timerId[i]);
            }
            message.reply("Timer stopped");
        }else if(command == "gimme"){
            for(var i = 0; i < args.length; i++){
                if(args[i] == "overwatch"){
                    message.member.addRole('598439904401293342')
                        .then(console.log)
                        .catch(console.error);
                }
                if(args[i] == "csgo"){
                    message.member.addRole('598908280496193571')
                        .then(console.log)
                        .catch(console.error);
                }
                if(args[i] == "dota"){
                    message.member.addRole('598909876470677515')
                        .then(console.log)
                        .catch(console.error);
                }
                if(args[i] == "fortnite"){
                    message.member.addRole('598908528358457345')
                        .then(console.log)
                        .catch(console.error);
                }
                if(args[i] == "pubg"){
                    message.member.addRole('598908374783885322')
                        .then(console.log)
                        .catch(console.error);
                }
                if(args[i] == "rainbowsixsiege"){
                    message.member.addRole('621352864882753548')
                        .then(console.log)
                        .catch(console.error);
                }
            }
            message.reply("Доступные Роли выданы");

        }

    }
});

