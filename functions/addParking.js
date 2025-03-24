const supabase = require('../utils/supabase');

/**
 * Ajoute une voiture à la base de données.
 * 
 * @param {string} id_reservation - l'id de la réservation.
 * @param {string} date_effective_arrivee - La date d'arrivée prévue.
 * @returns {Promise<Object>} Un objet contenant l'id et la date d'arrivée ajoutée.
 * @throws {Error} En cas d'erreur lors de l'insertion dans la base de données.
 */

async function addParking(id_reservation, date_effective_arrivee) {
    try {
        const { data, error } = await supabase
            .from('stationnements')
            .insert({ reservation: id_reservation, date_effective_arrivee })
            .select('reservation, date_effective_arrivee')
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = addParking;