const loadSlashCommands = require('../Loaders/loadSlashCommands');

module.exports = async bot => {

    await loadSlashCommands(bot)
    //Message des bots
    console.log(`${bot.user.tag} est bien en ligne !`)
}