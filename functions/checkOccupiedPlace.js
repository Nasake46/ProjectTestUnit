const supabase = require('../utils/supabase');

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
        return [];
    }
}

module.exports = checkOccupiedPlace;