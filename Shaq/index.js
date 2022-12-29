const Discord = require('discord.js');
const config = require('./config');
const loadCommands = require('./Loaders/loadCommands');
const loadEvents = require('./Loaders/loadEvents');

//--------------------------------------------------------
//Permission du discord, ses intentions ! :
const intents = new Discord.IntentsBitField(3276799);

//Création de l'objet bot qui est le client du bot.
const bot = new Discord.Client({intents});
//--------------------------------------------------------


//La classe collection sert à garder les données donc bot.commands sert à garder les données des commandes !
bot.commands = new Discord.Collection();

//-----------------------------------Connexion Du Bot------------------------------------
bot.login(config.token);
//---------------------------------------------------------------------------------------

//Fonction qui permet de savoir si le bot à éffectué la commande avec succès !
loadCommands(bot);
loadEvents(bot);


//----------------------------------------Commande bot discord--------------------
