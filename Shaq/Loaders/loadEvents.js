//Ce fichier sert à savoir si la commande à bien été éxécuté ou pas.

const fs = require('fs');


// On export les commandes du dossier commande que je vais créé pour mon bot
// fs va nous permettre de filtrer les fichiers et de ne prendre en compte que les fichiers finissant avec .js
//La fonction filtre utilise la méthode "endwith" (qui sert à montrer quelle est la fin de la chaine de caractère) ".js" pour filtrer les fichiers dans le dossier
//Je fais ensuite une promesse .then en asynchrone
module.exports = async bot => {

    fs.readdirSync("./Events").filter(filtre => filtre.endsWith(".js"))

    //La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
    .forEach(async file => {
        let event = require(`../Events/${file}`)
        bot.on(file.split(".js").join(""), event.bind(null, bot))
        console.log(`Evenement ${file} chargé avec succès !`)

    });
};