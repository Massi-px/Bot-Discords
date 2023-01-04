const Discord = require('discord.js');
const config = require('./config.js');
const loadCommands = require('./Loaders/loadCommands')
const loadEvents = require('./Loaders/loadEvents');
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});



//La classe collection sert à garder les données donc bot.commands sert à garder les données des commandes !
bot.commands = new Discord.Collection();

// Log in to Discord with your client's token
bot.login(config.token)

    .then( r => {
            loadCommands(bot);
            loadEvents(bot);
        }, (err) => {
            console.log('Token Invalid')
        }
    )
