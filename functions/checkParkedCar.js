const supabase = require('../utils/supabase');

/**
 * Vérifie si une voiture est actuellement stationnée.
 * 
 * Cette fonction interroge la base de données pour voir si une voiture est toujours dans un emplacement de stationnement,
 * en vérifiant si `date_effective_sortie` est `null` pour une réservation liée à cette voiture.
 * 
 * @async
 * @function checkParkedCar
 * @param {number} id_voiture - L'identifiant unique de la voiture à vérifier.
 * @returns {Promise<boolean>} - Retourne `true` si la voiture est actuellement stationnée, sinon `false`.
 * @throws {Error} - En cas d'erreur lors de la requête à la base de données.
 */
async function checkParkedCar(id_voiture) {
    try {   
        const { data, error } = await supabase
            .from('stationnements')
            .select("*, reservation!inner(*, voiture(id))")
            .is('date_effective_sortie', null)
            .eq('reservation.voiture', id_voiture);

        if (error) throw error;

        return data.length > 0;
    } catch (error) {
        console.log(error);
        return [];
    }
}

module.exports = checkParkedCar;
