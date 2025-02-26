const supabase = require('../utils/supabase');
/**
 * Récupère la liste des places et les filtre selon leur disponibilité.
 * 
 * @async
 * @function filterPlaces
 * @returns {Promise<{ all: Array, count: number, occupied: Array }>} - Objet contenant :
 *    - `all` : Toutes les places disponibles dans la base de données.
 *    - `count` : Nombre total de places.
 *    - `occupied` : Liste des places actuellement occupées.
 * @throws {Error} - En cas d'erreur avec la requête Supabase.
 */
async function filterPlaces() {
    try {
        // Requête Supabase pour récupérer toutes les places avec leurs réservations et stationnements
        const { count, data, error } = await supabase
            .from('places') // Table principale : places
            .select("*, reservations(*, voiture(*), stationnements(*))", { count: 'exact' }); 
            // Sélectionne toutes les places avec :
            // - leurs réservations associées
            // - les stationnements liés aux réservations (renommés "stationnements" pour clarté)

        if (error) throw error; // Gestion d'erreur : on lève une exception si Supabase retourne une erreur

        // Filtrer les places occupées
        const occupied = data.filter(({ reservations }) => {
            if (reservations.length === 0) return false; 
            // Si une place n'a AUCUNE réservation, elle est forcément libre

            const isPlaceOccupied = ({ stationnements }) => stationnements.some(({ date_effective_sortie }) => !date_effective_sortie);
            // Vérifie si AU MOINS UN stationnement n'a pas de `date_effective_sortie` (donc la voiture est toujours là)
            
            return reservations.some(isPlaceOccupied);
            // La place est occupée si au moins UNE réservation en cours a un stationnement actif
        });

        // Retourne toutes les places, leur nombre total et celles occupées
        return { all: data, count, occupied };
    } catch (error) {
        console.log(error); // Affichage de l'erreur en console
    }
}

module.exports = filterPlaces;