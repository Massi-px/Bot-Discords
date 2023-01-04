//Ce fichier sert à savoir si la commande à bien été éxécuté ou pas.

const fs = require('fs');


// On export les commandes du dossier commande que je vais créé pour mon bot
// fs va nous permettre de filtrer les fichiers et de ne prendre en compte que les fichiers finissant avec .js
//La fonction filtre utilise la méthode "endwith" (qui sert à montrer quelle est la fin de la chaine de caractère) ".js" pour filtrer les fichiers dans le dossier
//Je fais ensuite une promesse .then en asynchrone
module.exports = async bot => {

    fs.readdirSync("./Command").filter(filtre => filtre.endsWith(".js"))

    //La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
    .forEach(async file => {
        let command = require(`../Command/${file}`)
        //Si le fichier n'a pas de nom. On utilise la fonction slice pour enlever le '.js' qui sont 3 caractères,
        //Ou que ce n'est pas un string, alors le fichier n'a pas de nom, cette erreur sera affiché.
        if(!command.name || typeof command.name !== "string") throw new TypeError(`La commande ${file.slice(0, file.length - 3)} n'a pas de nom !`)
        bot.commands.set(command.name, command)
        console.log(`Commande ${file} chargée avec succès !`)
    });
};