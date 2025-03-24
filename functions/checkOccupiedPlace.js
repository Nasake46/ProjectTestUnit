const supabase = require('../utils/supabase');

/**
 * Vérifie si une voiture est actuellement stationnée.
 * 
 * Cette fonction interroge la base de données pour voir si une voiture est toujours dans un emplacement de stationnement,
 * en vérifiant si `date_effective_sortie` est `null` pour une réservation liée à cette voiture.
 * 
 * @async
 * @function checkOccupiedPlace
 * @param {number} id_place - L'identifiant unique de la place à vérifier.
 * @returns {Promise<boolean>} - Retourne `true` si la place est occupée, sinon `false`.
 * @throws {Error} - En cas d'erreur lors de la requête à la base de données.
 */

async function checkOccupiedPlace(id_place) {
    try {   
        const { data, error } = await supabase
            .from('stationnements')
            .select("*, reservation!inner(*, place(id))")
            .is('date_effective_sortie', null)
            .eq('reservation.place', id_place);

        if(error) throw error;

        return data.length>0;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = checkOccupiedPlace;