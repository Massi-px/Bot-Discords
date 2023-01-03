const Discord = require('discord.js');

module.exports = {
    name:"unban",
    description:"Unban un membre discord",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type:"user",
            name:"membre",
            description: "Le membre a unban",
            required: true
        },

    ],

    async run(bot, message, args,etat=true) {

        try {
            let user = args.getUser("membre");

            if(!user) return  message.reply("Pas d'utilisateur à unban.")

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Cet utilisateur n'est pas banni.")

            try {await user.send(`Tu as été unban de ${message.guild.name} par ${message.user.tag}`)} catch(err){console.log(err)}

            if(etat===true)await message.reply(`${message.user} a unban ${user.tag}.`)

            await message.guild.members.unban(user,null);
        }

        catch(err)
        {
            console.log(err)
            return message.reply("Utilisateur Inconnu !")
        }

    }
}