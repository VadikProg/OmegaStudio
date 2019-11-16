const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

bot.login(config.token);
const prefix = config.prefix;
 //Main events
	bot.on('ready', async() => {
		  console.log(`Bot is online`);
	});
	
	bot.on(`message`, async(message) =>{
		if(message.author.bot) return undefined;
		if(message.content.startsWith(prefix)){
			
			let arguments = message.content
				.slice(prefix.length)
				.trim()
				.split(" ");
			let command = arguments.shift().toLowerCase();			

			if(command == "voice"){
				if(arguments.join(" ")){
					console.log(message)
					message.guild.createChannel(`${arguments.join(" ")} : @${message.author.username}`,{type : "voice"})
						.then(console.log)
  						.catch(console.error);	
					message.reply("Канал создан");
					
				}else{
					message.reply(`Канал должен иметь имя`);
				}
			}
		}

	});

	bot.on('voiceStateUpdate', (oldMember, newMember) => {
		let newUserChannel = newMember.voiceChannel
		let oldUserChannel = oldMember.voiceChannel
		if(oldUserChannel === undefined && newUserChannel !== undefined) {
			console.log(`Connect ${newMember.id}`);
		 } else if(newUserChannel === undefined){
			console.log(`Leave ${oldMember}`);
		 }
		
	})


	bot.on('guildMemberAdd', member => {
		let channelVar = member.guild.channels.find(ch => ch.name === config.greetCh);
		channelVar.send(`Hello dear ${member}`);
		let role = member.guild.roles.find(Role => Role.name === config.StartUserRole);
		member.addRole(role);
	});
