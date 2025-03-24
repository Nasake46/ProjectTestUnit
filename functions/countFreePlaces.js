const filterPlaces = require('./filterPlaces');

/**
 * Compte le nombre de places de stationnement libres.
 * 
 * Cette fonction utilise `filterPlaces()` pour récupérer le nombre total de places et celles occupées,
 * puis retourne le nombre de places disponibles.
 * 
 * @async
 * @function countFreePlaces
 * @returns {Promise<number>} - Le nombre de places libres.
 * @throws {Error} - En cas d'erreur lors de l'exécution de `filterPlaces()`.
 */
async function countFreePlaces() {
    try {   
        const { count, occupied } = await filterPlaces();
        //console.log(all.length, occupied.length);

        return count - occupied.length;
    } catch (error) {
        console.log(error);
        return [];
    }
}

module.exports = countFreePlaces;
