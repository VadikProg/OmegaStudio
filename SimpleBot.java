package com.company;

/*

Libs fot JDA(Java Discord API) Not JDA Software!!!

Documentation, examples, source: https://github.com/DV8FromTheWorld/JDA


*/
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.OnlineStatus;
import net.dv8tion.jda.api.audio.AudioReceiveHandler;
import net.dv8tion.jda.api.audio.AudioSendHandler;
import net.dv8tion.jda.api.audio.CombinedAudio;
import net.dv8tion.jda.api.entities.*;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.managers.AudioManager;



/*
 Standart libs
 ↓
*/

import java.io.*;
import java.util.*;

public class SimpleBot {
    public static void main(String[] args){
    
        JDABuilder builder = new JDABuilder(args[0]);
        // Disable parts of the cache
        
        builder.setDisabledCacheFlags(EnumSet.of(CacheFlag.ACTIVITY, CacheFlag.VOICE_STATE));
        
        // Enable the bulk delete event
        
        builder.setBulkDeleteSplittingEnabled(false);
        
        // Disable compression (not recommended)
        
        builder.setCompression(Compression.NONE);
        // Set activity (like "playing Something")
        builder.setActivity(Activity.watching("TV"));
        builder.build();
    }
}
/*
╔╗──╔╗╔══╗╔╗╔╗╔╗╔═══╗╔════╗──╔══╗─╔══╗╔═══╗
║║──║║║╔╗║║║║║║║║╔══╝╚═╗╔═╝──║╔╗║─║╔═╝║╔══╝
║╚╗╔╝║║║║║║╚╝╚╝║║╚══╗──║║────║╚╝╚╗║║──║╚══╗
║╔╗╔╗║║║║║║╔╗╔╗║║╔══╝──║║────║╔═╗║║║──║╔══╝
║║╚╝║║║╚╝║║║║║║║║╚══╗──║║────║╚═╝║║╚═╗║╚══╗
╚╝──╚╝╚══╝╚╝╚╝╚╝╚═══╝──╚╝────╚═══╝╚══╝╚═══╝
╔╗╔╗╔╗╔═══╗
║║║║║║║╔══╝
║╚╝╚╝║║╚══╗
║╔╗╔╗║║╔══╝
║║║║║║║╚══╗
╚╝╚╝╚╝╚═══╝
╔╗─╔╗╔══╗╔══╗─╔═══╗───╔══╗╔══╗╔═╗
║╚═╝║║╔╗║║╔╗╚╗║╔══╝───╚╗╔╝║╔═╝╚╗║
║╔╗─║║║║║║║╚╗║║╚══╗────║║─║╚═╗╔╝║
║║╚╗║║║║║║║─║║║╔══╝──╔╗║║─╚═╗║║╔╝
║║─║║║╚╝║║╚═╝║║╚══╗╔╗║╚╝╚╗╔═╝║╔╗
╚╝─╚╝╚══╝╚═══╝╚═══╝╚╝╚═══╝╚══╝╚╝
*/

