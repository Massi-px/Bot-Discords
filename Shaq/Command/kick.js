const Discord = require('discord.js');

module.exports = {
    name:"kick",
    description:"Kick un membre discord",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type:"user",
            name:"membre",
            description: "Le membre a kick",
            required: true
        },
        {
            type:"string",
            name:"raison",
            description:"La raison du kick",
            required: false
        }
    ],

    async run(bot, message, args) {

        try {
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Pas de membre à kick")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison");
            if(!reason) reason = "Aucune raison fourni"

            if (message.user.id === user.id) return message.reply("Tu ne peux pas te kick !")
            if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Impossible de kick le propriétaire du serveur !")

            if(member && !member.kickable) return message.reply("Je ne peux pas kick ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <- 0) return message.reply("Tu ne peux pas kick un plus haut gradé !")

            try {await user.send(`Tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply (`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

            await member.kick(reason)
        }

        catch(err)
        {
            console.log(err)
            return message.reply("Utilisateur Inconnu !")
        }

    }
}