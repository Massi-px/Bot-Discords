const Discord = require('discord.js');

module.exports = {
    name:"unmute",
    description:"Unmute un membre discord",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type:"user",
            name:"membre",
            description: "Le membre a unmute",
            required: true
        },

    ],

    async run(bot, message, args) {

        try {
            let user = args.getUser("membre");
            if(!user) return message.reply("Pas de membre à unmute")

            let member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply("Pas de membre à unmute")

            if(!member.moderatable) return message.reply("Je ne peux pas unmute ce membre")

            if(!member.isCommunicationDisabled()) return message.reply ("Ce membre n'est pas mute")

            try {await user.send(`Tu as été unmute de ${message.guild.name} par ${message.user.tag}`)} catch(err){console.log(err)}

            await message.reply(`${message.user} a unmute ${user.tag}.`)

            await member.timeout(null);
        }

        catch(err)
        {
            console.log(err)
            return message.reply("Utilisateur Inconnu !")
        }

    }
}