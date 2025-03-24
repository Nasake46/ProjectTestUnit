const supabase = require('../utils/supabase');

/**
 * Met à jour une voiture dans la base de données.
 * 
 * @param {number} id - L'ID de la voiture à mettre à jour.
 * @param {string} plaque - La nouvelle plaque d'immatriculation de la voiture.
 * @param {string} type - Le nouveau type de la voiture.
 * @returns {Promise<Object>} Un objet contenant l'ID, la plaque et le type mis à jour.
 * @throws {Error} En cas d'erreur lors de la mise à jour.
 */
async function updateCar(id, plaque, type) {
    try {
        const { data, error } = await supabase
            .from('voitures')
            .update({ plaque, type })
            .eq('id', id)
            .select('id, plaque, type')
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = updateCar;
