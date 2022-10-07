const Discord = require('discord.js');

module.exports = {
  name:"ban",
  description:"Ban un membre discord",
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
        name:"raison",
        description:"La raison du bannissement",
        required: false
    }
  ],

  async run(bot, message, args) {

    try {
  
        let user = await bot.users.fetch(args._hoistedOptions[0].value)
        if(!user) return message.reply("Pas de membre à bannir")
        let member = message.guild.members.cache.get(user.id)

        let reason = args.getString("raison");
        if(!reason) reason = "Aucune raison fourni"

        if (message.user.id === user.id) return messages.reply("Tu ne peux pas te bannir !")
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Impossible de ban le propriétaire du serveur !")

        if(member && !member.bannable) return message.reply("Je ne peux pas ban ce membre !")
        if(member && message.member.roles.hightest.comparePositionTo(members.roles.hightest) <- 0) return message.reply("Tu ne peux pas bannir un plus haut gradé !")

        if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà banni !")

        try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

        await message.reply (`${message.user} a banni ${user.tag} pour la raison : \`${reason}\``)

        await message.guild.bans.create(user.id, {reason: reasons})
    }

    catch(err)
    {
        return message.reply("Utilisateur Inconnu !")
    }
  
    }
}