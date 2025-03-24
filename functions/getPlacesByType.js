const supabase = require('../utils/supabase');

/**
 * Récupère les places de stationnement en fonction de leur type.
 * 
 * Cette fonction interroge la base de données pour obtenir la liste des places correspondant à un type donné.
 * 
 * @async
 * @function getPlacesByType
 * @param {string} type - Le type de place à récupérer (ex: "citadine", "SUV", etc.).
 * @returns {Promise<Object[]>} - Un tableau contenant les places correspondant au type spécifié.
 * @throws {Error} - En cas d'erreur lors de la requête à la base de données.
 */
async function getPlacesByType(type) {
    try {
        const { data, error } = await supabase
            .from('places')
            .select("id, type")
            .eq('type', type);

        if (error) throw error;

        //const places = data.map(place => place.id);
        console.log(data);
        return data;
    } catch (error) {
        //console.log(error);
        return [];
    }
}

// getPlacesByType("citadine");

module.exports = getPlacesByType;
