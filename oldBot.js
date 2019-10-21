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
});

function sys0(message){
    const systemCh = message.guild.channels.find(channel => channel.name === "system");
    systemCh.send("!d bump");
}
client.on('message', message => {
    //if(message.content.startsWith(MusicPrefix)){
      //  message.reply("debugged");
        //const serverQueue = queue.get(message.guild.id);

        //if(message.content.startsWith(MusicPrefix + "play")){
          // execute(message, serverQueue);
           // return;
        //}else if(message.content.startsWith(MusicPrefix + "stop")){
          //  stop(message, serverQueue);
            //return;
        //}else if(message.content.startsWith(MusicPrefix + "skip")){
          //  skip(message, serverQueue);
            //return;
        //}else{
          //  message.reply("Що це таке?");
        //}
    //}


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

/*
функции для музычки
*/
async function execute(message, serverQueue) {
    const args = message.content.split(' ');

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('В голосовой залетай');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send("Ля, права дай");
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send("${song.title} добавлена в очередь");
    }

}

function skip(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send("Подключись к каналу");
    if (!serverQueue) return message.channel.send('Ты дуранчеус?');
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send('Вернись в канал');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
            console.log("Кончилась музыка");
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => {
            console.error(error);
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
