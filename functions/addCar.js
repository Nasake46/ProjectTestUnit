const supabase = require('../utils/supabase');

/**
 * Ajoute une voiture à la base de données.
 * 
 * @param {string} plaque - La plaque d'immatriculation de la voiture.
 * @param {string} type - Le type de la voiture.
 * @returns {Promise<Object>} Un objet contenant la plaque et le type de la voiture ajoutée.
 * @throws {Error} En cas d'erreur lors de l'insertion dans la base de données.
 */
async function addCar(plaque, type) {
    try {
        const { data, error } = await supabase
            .from('voitures')
            .insert({ plaque, type })
            .select('plaque, type')
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = addCar;
