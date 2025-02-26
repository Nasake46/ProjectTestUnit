const supabase = require('../utils/supabase');

async function checkParkedCar(id_voiture) {
    try {   
        const { data, error } = await supabase
            .from('stationnements')
            .select("*, reservation!inner(*, voiture(id))")
            .is('date_effective_sortie', null)
            .eq('reservation.voiture', id_voiture);

        if(error) throw error;

        return data.length>0;
    } catch (error) {
        console.log(error);
        return [];
    }
}

module.exports = checkParkedCar;