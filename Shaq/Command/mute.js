const Discord = require('discord.js');
const ms = require('ms')

module.exports = {
    name:"mute",
    description:"Mute un membre discord",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
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
            required: false
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
            let user = args.getUser("membre");
            if(!user) return message.reply("Pas de membre à mute")

            let member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply("Pas de membre à mute")

            let time = args.getString("temps");
            if(!time) time = "0 seconde"
            if(isNaN(ms(time)) > 2419200000) return message.reply ("Le mute ne peut pas duré plus de 28 jours !")

            let reason = args.getString("raison");
            if(!reason) reason = "Aucune raison fournie"

            if (message.user.id === user.id) return message.reply("Tu ne peux pas te mute !")

            if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Impossible de mute le propriétaire du serveur !")

            if(member && !member.moderatable) return message.reply("Je ne peux pas mute ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <- 0) return message.reply("Tu ne peux pas mute un plus haut gradé !")

            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est mute banni !")

            try {await user.send(`Tu as été mute du serveur ${message.guild.name} par ${message.user.tag} pendant ${time} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply (`${message.user} a mute ${user.tag} pendant ${time} pour la raison : \`${reason}\``)

            await member.timeout(ms(time,reason))
        }

        catch(err)
        {
            console.log(err)
            return message.reply("Utilisateur Inconnu !")
        }

    }
}