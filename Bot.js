const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

bot.login(config.token);
const prefix = config.prefix;
 //Main events
	bot.on('ready', () => {
		  console.log(`Я готов`)
	});
	
	bot.on(`message`, message =>{
		if(message.author.bot) return undefined;
		console.log("Опа, сообщение")
		if(message.content.startsWith(prefix)){
			
			let arguments = message.content
				.slice(prefix.length)
				.trim()
				.split(" ");
			let command = arguments.shift().toLowerCase();			

			if(command == "voice"){
				if(arguments.join(" ")){
					message.guild.createChannel(`${arguments.join(" ")} : @${message.author.username}`,{type : "voice"})
						.then(console.log)
  						.catch(console.error);	
					message.reply("Канал создан");
					
				}else{
					message.reply(`Канал должен иметь имя`);
				}
			}

			if(command == "find"){
				const channelF = message.guild.channels.find(ch => ch.name === arguments.join(" "));
				message.channel.send(channelF.id);
			}




		}

	});


	bot.on('GuildMemberAdd', member => {
		const channel = member.guild.channels.find(ch => ch.name === `hello`);
		channel.send(`Привет дорогой ${member}.
		Мы ради приветствовать тебя на нашем сервере`);
	})
