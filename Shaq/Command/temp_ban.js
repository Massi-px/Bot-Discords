const Discord = require('discord.js');
const ms = require('ms');
const Ban=require("./ban.js");
const Unban=require("./unban.js");

module.exports = {
    name:"temp_ban",
    description:"Ban un membre discord temporairement",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type:"user",
            name:"membre",
            description: "Le membre a bannir",
            required: true
        },

        {
            type:"string",
            name:"temps",
            description:"Le temps du mute",
            required: true
        },

        {
            type:"string",
            name:"raison",
            description:"La raison du bannissement",
            required: false
        }

    ],
    async run(bot, message, args) {

        try {
            let time = args.getString("temps");
            let intTime=Math.abs(ms(time));

            if(isNaN(intTime))return message.reply (`La durée n'est pas valide`);
            else if(intTime >7.885e+9)return message.reply(`La durée ne peut pas dépasser 3 mois, veuillez utliser la commande \`/ban\` `);

            if(await Ban.run(bot,message,args,false)==0){
                let user = args.getUser("membre");
                let reason = args.getString("raison");
                if(!reason) reason = "Aucune raison fourni";
                let time = args.getString("temps");

                await message.reply(`${message.user} a banni temporairement ${user.tag} pendant ${time} pour la raison : \`${reason}\``);

                try {await user.send(`durée : ${time}`)} catch(err){console.log(err)};

                setTimeout(async function() {
                    if((await message.guild.bans.fetch()).get(user.id)) Unban.run(bot,message,args,false);
                }, intTime);
            }
        }
        catch(err){
            console.log(err);
            return message.reply("Erreur !");
        }
        
    }
}