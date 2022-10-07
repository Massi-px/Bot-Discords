const Discord = require('discord.js');

module.exports = {
    name: "ping",
    description: "Affiche la latence",
    permission: "Aucune",
    dm: true,
    async run(bot, message, args) { 
        //Contruction de la commande permettant d'obtenir le ping du serveur.
        await message.reply(`Ping : \`${bot.ws.ping}\``);
    }
};